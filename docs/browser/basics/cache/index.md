# 缓存策略

缓存是性能优化中非常重要的一环，浏览器的缓存对开发也是非常重要的知识点。

## 强缓存

浏览器的缓存作用分为两种情况，一种是需要发送`HTTP`请求，一种是不需要发送。

首先是检测强缓存，这个阶段不需要发送`HTTP`请求。

在`HTTP/1`和`HTTP/1.1`当中，这个字段是不一样的。在早起，也就是`HTTP/1`时期，使用的是`Expires`，而`HTTP/1.1`时期，使用的是`Cache-Control`

**Expires**

`Expires`即过期时间，存在于服务端返回的响应头中，告诉浏览器在这个过期时间之前可以直接从缓存里面获取数据，无需再次请求。

格式如下：

```bash

Expires: Wed, 22 Nov 2019 08:41:00 GMT

```

表示资源在*2019年10月22号8点41分0秒*过期，过期了就得向服务器发送请求。

这种方式可能存在的问题：服务器的时间和浏览器的时间可能不一致，那服务器返回的这个过期时间的计算可能就不准确。因此这种方式后来就被抛弃了。

**Cache-Control**

在`HTTP/1.1`中，采用了`Cache-Control`。它和`Expires`本质的区别在于：它没有采用*具体过期时间*这个方式，而是采用了*过期时长*来控制缓存，对应的字段是`max-age`。

格式如下：

```bash

Cache-Control: max-age = 3600

```

代表这个响应放回后在3600秒（1小时内）可以直接使用缓存。

除了`max-age`，它还有很多参数，用来完成更多缓存场景的判断。如下：

- `public`：客户端和代理服务器都可以缓存。因为一个请求可能要经过多个*代理服务器*最后才能到达目标服务器，那么结果就是不仅浏览器可以缓存数据，中间的任何代理节点都可以进行缓存。
- `private`：只有浏览器可以缓存，中间的代理服务器不可以缓存。
- `no-cache`：跳过当前的强缓存，发送HTTP请求，即直接进入*协商缓存*阶段。
- `no-store`：不进行任何形式的缓存。
- `s-maxage`：和`max-age`有点像，不同在于它是针对代理服务器的缓存时间。

::: warning 注意

当 `Expires`和`Cache-Control`同时存在的时候，`Cache-Control`会被优先考虑

:::

还有一种情况，当资源缓存超时，也就是强缓存失效了，那么接下来就进入了第二道屏障——协商缓存了。

## 协商缓存

强缓存失效后，浏览器在请求头中携带缓存tag向服务器发送发送HTTP请求，由服务器根据这个tag来决定是否使用缓存，这就是**协商缓存**。

具体来说，这样的缓存tag分为两种：`Last-Modified`和`ETag`。这两者各有优劣，并不存在谁对谁有绝对的优势。

**Last-Modified**

即最后修改时间。在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段。

浏览器收到后，如果再次请求，会在请求中的携带`If-Modified-Since`字段，这个字段的值也就是服务器传来的最后修改时间。

服务器拿到请求头中的`If-Modified-Since`字段后，会和服务器中该资源*最后修改时间*作对比：

- 如果请求头中的值小于最后修改时间，说明是时候更新了。则返回新的资源，更常规HTTP请求响应的流程一样。
- 否则返回304，告诉浏览器直接用缓存。

**ETag**

`ETag`是服务器根据当前文件的内容，给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。服务器通过响应头将这个值传递给浏览器。

浏览器接收到`ETag`的值，会在下次请求的时候，将这个值作为`If-None-Match`这个字段的内容，并放在请求头中，然后发送给服务器。

服务器接收到`If-None-Match`这个字段后，会跟服务器上该资源的`ETag`做对比：

- 如果两者不一样，说明要更新了。返回新的资源，更常规HTTP请求响应的流程一样。
- 否则返回304，告诉浏览器直接用缓存。

**两者对比**

- 在精准度上，`ETag`优于`Last-Modified`。由于`ETag`是按照内容给资源加标识，因此能准确感知资源的变化。而`Last-Modified`不一样，它在一些特殊情况并不能准确感应资源的变化，主要有以下两种情况：
  - 编辑了资源文件，但文件内容并没有修改，这样也会造成缓存失效。
  - `Last-Modified`能够感知的时间单位是秒，如果文件在1秒内改变多次，这个时候`Last-Modified`并没有体现出修改了。
- 在性能上，`Last-Modified`优于`ETag`。由于`Last-Modified`仅仅是记录一个时间点，而`ETag`要根据文件的内容生成哈希值。

::: warning 注意：

如果两种方式都支持的话，服务器会优先考虑`ETag`

:::

## 缓存位置

当强缓存命中或者协商缓存中服务器返回304的时候，我们直接从缓存中获取资源。那么这些资源究竟缓存在什么位置呢？

浏览器中的缓存位置一共有四中，按照优先级从高到低排列依次是：

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

**Service Worker**

`Service Worker`借鉴了`Web Worker`的思路，即让JS运行在主线程之外，由于它脱离了浏览器的窗体，因此无法直接访问DOM。虽然如此，但它仍然能帮助我们完成很多有用的功能，比如*离线缓存*、*消息推送*和*网络代理*等功能。其中的离线缓存就是`Service Worker Cache`。

`Service Worker`同时也是PWA的重要实现机制.

**Memory Cache**

`Memory Cache`指的是内存缓存，从效率上讲它是最快的。但是从存活时间来讲又是最短的，当渲染进程结束后，内存缓存也就不存在了。

**Disk Cache**

`Disk Cache`就是存储在磁盘中的缓存，从存取效率上讲是比内存缓存慢的，但是他的优势在于存储容量和存储时长。

::: tip 浏览器如何决定资源放在内存还是磁盘里呢？

- 比较大的`js/css`文件会被直接丢进磁盘，反之丢进内存
- 内存使用率比较高的时候，文件优先进入磁盘

:::

**Push Cache**

即推送缓存，这是浏览器缓存的最后一道防线。它是`HTTP/2`中的内容，虽然现在应用的并不广泛，但随着`HTTP/2`的推广，它的应用越来越广泛。关于`Push Cache`，有非常多的内容可以挖掘。

## 总结

首先通过`Cache-Control`验证强缓存是否可以用

- 如果强缓存可用，直接使用
- 否则进入协商缓存，即发送HTTP请求，服务器通过请求头中的`If-Modified-Since`或者`If-None-Match`字段检验资源是否更新：
  - 若资源更新，则返回资源和200状态码
  - 若资源没有更新，返回304，告诉浏览器直接从缓存获取资源

> 参考文档：[浏览器灵魂之问](https://juejin.cn/post/6844904021308735502)