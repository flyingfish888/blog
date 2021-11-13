# 本地存储

浏览器本地存储主要分为`Cookie`、`WebStorage`和`IndexedDB`，其中`WebStorage`又可分为`LocalStorage`和`SessionStorage`。

## Cookie

`Cookie`最开始被设计出来其实并不是来做本地存储的，而是为了弥补HTTP在状态管理上的不足。

HTTP协议是一个无状态协议，客户端向服务器发送请求，服务器返回响应，故事就这样结束了，但是下次请求如何让服务端知道客户端是谁呢？

这种背景下，就产生了`Cookie`。

Cookie本质上就是浏览器存储的一个很小的文本文件，内部以键值对的形式来存储。

向统一域名下发送请求，都会携带相同的Cookie，服务端拿到Cookie进行解析，便能拿到客户端状态。

Cookie的作用很好理解，就是来做状态存储的，但它也是有诸多致命的缺陷的：

1. 容量缺陷：Cookie的体积上限只有4KB，只能用来存储少量信息。
2. 性能缺陷：Cookie紧跟域名，不管域名下的某个地址需不需要这个Cookie，请求都会携带上完整的Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费，因为请求携带了许多不必要的内容。
3. 安全缺陷：由于Cookie以纯文本的形式在浏览器和服务器之间进行传递，很容易被非法用户截获，然后进行一系列的串改，在Cookie的有效期内重新发送给服务器，这是相当危险的。另外，在`HttpOnly`为false的情况下，Cookie信息能直接通过js脚本读取。

## Session

session本身不能算是浏览器存储，它是存在服务器中的用来存放用户数据的类hashTable结构

- 浏览器第一次发送请求时，服务器自动生成了HashTable和SessionId
- SessionId来唯一标识这个HashTable，服务器通过响应将SessionId发送给浏览器
- 浏览器第二次发送请求会将前一次服务器响应中的SessionID放在请求中一并发送到服务器上
- 服务器从请求中提取出Session ID，并和保存的所有Session ID进行对比，找到这个用户对应的HashTable

**与cookie对比**

1. 存储位置不同
  - cookie的数据信息存放在本地。
  - session的数据信息存放在服务器上。
2. 存储容量大小不同
  - cookie存储的容量较小，一般<=4KB。
  - session存储容量大小没有限制(但是为了服务器性能考虑，一般不能存放太多数据)。
3. 存储有效期不同
  - cookie可以长期存储，只要不超过设置的过期时间，可以一直存储。
  - session在超过一定的操作时间(通常为30分钟)后会失效，但是当关闭浏览器时，为了保护用户信息，会自动调用session.invalidate()方法，该方法会清除掉session中的信息。
4. 安全性不同
  - cookie存储在客户端，所以可以分析存放在本地的cookie并进行cookie欺骗，安全性较低。
  - session存储在服务器上，不存在敏感信息泄漏的风险，安全性较高。
5. 域支持范围不同
  - cookie支持跨域名访问。例如，所有a.com的cookie在a.com下都能用。
  - session不支持跨域名访问。例如，www.a.com的session在api.a.com下不能用。
6. 对服务器压力不同
  - cookie保存在客户端，不占用服务器资源。
  - session是保存在服务器端，每个用户都会产生一个session，session过多的时候会消耗服务器资源，所以大型网站会有专门的session服务器。
7. 存储的数据类型不同
  - cookie中只能保管ASCII字符串，并需要通过编码方式存储为Unicode字符或者二进制数据。
  - session中能够存储任何类型的数据，包括且不限于string，integer，list，map等。

## localStorage

和Cookie异同

localStorage有一点和Cookie一样，就是针对一个域名，即在同一域名下，会存储相同的一段localStorage。

不过它相对Cookie还是有区别的：

1. 容量：localStorage的容量上限是5M，相比于Cookie的4k大大增加。当然这个5M是针对一个域名的，因此对于一个域名是持久存储的。
2. 只存在客户端，默认不参与服务端的通信。这样就很好地避免了Cookie的性能问题和安全问题。
3. 接口封装：通过localStorage暴露在全局，并通过它的`setItem`和`getItem`等方法进行操作，非常方便。

localStorage存储的都是字符串，如果存储对象，需要将对象转为字符串，使用的时候在转换回来。

利用localStorage较大容量和持久特性，可以存储一些内容稳定的资源，比如官网logo，存储base64格式的图片资源。

## sessionStorage

sessionStorage以下方面和localStorage一致:

- 容量。容量上限也为 5M。
- 只存在客户端，默认不参与与服务端的通信。
- 接口封装。除了sessionStorage名字有所变化，存储方式、操作方式均和localStorage一样。

但sessionStorage和localStorage有一个本质的区别，那就是前者只是会话级别的存储，并不是持久化存储。会话结束，也就是页面关闭，这部分sessionStorage就不复存在了。

**应用场景**

- 可以用它对表单信息进行维护，将表单信息存储在里面，可以保证页面即使刷新也不会让之前的表单信息丢失。
- 可以用它存储本次浏览记录。如果关闭页面后不需要这些记录，用sessionStorage就再合适不过了。事实上微博就采取了这样的存储方式。

## IndexedDB

IndexedDB是运行在浏览器中的非关系型数据库, 本质上是数据库，绝不是和刚才WebStorage的5M一个量级，理论上这个容量是没有上限的。

关于它的使用，MDN上的教程文档非常详尽：[使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)

## 总结
浏览器中各种本地存储和缓存技术的发展，给前端应用带来了大量的机会，PWA也正是依托了这些优秀的存储方案才得以发展起来。

重新梳理一下这些本地存储方案:

- cookie并不适合存储，而且存在非常多的缺陷。
- Web Storage包括localStorage和sessionStorage, 默认不会参与和服务器的通信。
- IndexedDB为运行在浏览器上的非关系型数据库，为大型数据的存储提供了接口。

> 参考文档： [cookie和session的区别](https://juejin.cn/post/6844903937523482631);