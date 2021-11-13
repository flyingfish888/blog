# 安全策略

浏览器的安全策略有哪些？

- 同源策略
- 沙盒框架
- Flash安全沙箱
- Cookie的安全策略
- 内容安全策略 (Content Security Polity, CSP)

## 同源策略

同源：协议，端口，域名全都一样。

不同源的客户端脚本(javascript、ActionScript)在没明确授权的情况下，不能读写对方的资源。

同源策略控制不同源之间的交互，例如在使用XMLHttpRequest或<img>标签时则会受到同源策略的约束。

这些交互通常分为三类：

- 跨域写操作（Cross-origin writes）一般是被允许的。例如链接（links），重定向以及表单提交。
- 跨域资源嵌入（Cross-origin embedding）一般是被允许。
- 跨域读操作（Cross-origin reads）一般是不被允许的，但常可以通过内嵌资源来巧妙的进行读取访问。例如，你可以读取嵌入图片的高度和宽度，调用内嵌脚本的方法。

场景：

- 不同源的js脚本无法读写当前页面的DOM；
- 不同源的js脚本无法读取当前页面的`Cookie、IndexDB、LocalStorage`等；
- 不同源的XMLHttpRequest访问无法进行。

## 沙盒框架

对常规`<iframe>`表现行为的扩展，它能让顶级页面对嵌入子页面即这个子页面的子资源设置一些额外额限制。

通过对`<iframe>`的参数sandbox实现限制：

```html
<iframe sandbox="value">
```

sandbox属性值：

|值|描述|
|:-:|:-:|
|""|应用以下所有的限制|
|allow-same-origin|允许iframe内容被视为与包含文档有相同的来源|
|allow-top-navigation|允许iframe内容从包含文档导航（加载）内容|
|allow-forms|允许表单提交|
|allow-scripts|允许脚本执行|

## Flash安全沙箱

类似同源策略：把同一域的资源放到一个安全组内，称安全沙箱。

web站点通过`crossdomain.xml`文件配置可以允许的域，跨域访问本站点的权限（放置于本站点根目录）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<cross-domain-policy>
    <allow-access-from domain="*.test.com" />
    <allow-access-from domain="test.com" />
</cross-domain-policy>
```

## Cookie的安全策略

- Domain：用于指定Cookie的有效域
- Path：用于指定Cookie的有效URL路径
- Secure：如果设置该属性，仅在HTTPS请求中提交Cookie
- Http：其实是HttpOnly，如果设置该属性，客户端javascript无法获取Cookie的值

## 内容安全策略 (Content Security Polity, CSP)

通过编码在HTTP响应头中的指令来实施策略

- `Content-Security-Polity:script-src 'self' https://baidu.com`
  
- CSP(Content-Security-Polity)的一些指令
  
  - default-src: 该指令在某种资源类型指定指令没有被定义的情况下制定了所有资源类型的加载策略(即默认的资源加载策略)

  - script-src: 该指令指定了Web应用程序可以加载的脚本的域或URL

  - object-src: 该指令指定了Web应用程序可以加载的插件，如Flash
  
  - style-src: 该指令指定了Web应用程序可以加载的CSS样式表的域或URL

  - img-src: 该指令指定了Web应用程序可以加载的图片的域或URL

  - media-src: 该指令指定了Web应用程序可以加载的音视频的域或URL

  - frame-src: 该指令指定了Web应用程序可以加载的框架的域或URL

  - font-src: 该指令指定了Web应用程序可以加载的字体的域或URL

  - connect-src: 该指令指定了Web应用程序可以加载的像XHR, WebSockets, 以及EventSource等脚本接口的域或URL

  - plugin-types: 该指令指定了哪些MIME类型的插件可以被加载(浏览器支持度不够)

  - form-action: 该指令指定了HTML表单可以提交的URLS(浏览器支持度不够)

  - reflected-xss: 该指令告诉浏览器开启或关闭任何用于过滤或组织反射跨站脚本攻击的启发式算法，这相当于X-XSS-Protection响应头的效果(浏览器支持度不够)


## XSS攻击

XSS全称是`Cross Site Scripting`(即跨站脚本)，为了和CSS区分，故叫它XSS。

XSS攻击是指浏览器中执行恶意脚本(无论是跨域还是同域)，从而拿到用户的信息并进行操作。
这些操作一般可以完成下面这些事情:

- 窃取Cookie。
- 监听用户行为，比如输入账号密码后直接发送到黑客服务器。
- 修改DOM伪造登录表单。
- 在页面中生成浮窗广告。

通常情况，XSS攻击的实现有三种方式——*存储型*、*反射型*和*文档型*。

**存储型**

存储型，顾名思义就是将恶意脚本存储了起来，确实，存储型的XSS将脚本存储到了服务端的数据库，然后在客户端执行这些脚本，从而达到攻击的效果。

常见的场景是留言评论区提交一段脚本代码，如果前后端没有做好转义的工作，那评论内容存到了数据库，在页面渲染过程中直接执行，相当于执行一段未知逻辑的JS代码，是非常恐怖的。这就是存储型的XSS攻击。

**反射型**

反射型XSS指的是恶意脚本作为网络请求的一部分。

比如输入：

```html
http://sanyuan.com?q=<script>alert("你完蛋了")</script>
```
这样，在服务器端会拿到q参数，然后将内容返回给浏览器端，浏览器将这些内容作为HTML的一部分解析，发现是一个脚本，直接执行，这样就被攻击了。

之所以叫它反射型，是因为恶意脚本是通过作为网络请求的参数，经过服务器，然后再反射到HTML文档中，执行解析。

和存储型不一样的是，服务器并不会存储这些恶意脚本。

**文档型**

文档型的XSS攻击并不会经过服务端，而是作为中间人的角色，在数据传输过程劫持到网络数据包，然后修改里面的html文档！

这样的劫持方式包括WIFI路由器劫持或者本地恶意软件等。

**防范措施**

明白了三种XSS攻击的原理，我们能发现一个共同点: 都是让恶意脚本直接能在浏览器中执行。

那么要防范它，就是要避免这些脚本代码的执行。

为了完成这一点，必须做到*一个信念*，*两个利用*。

**一个信念**

千万不要相信任何用户的输入！

无论是在前端和服务端，都要对用户的输入进行转码或者过滤。

如:
```html
<script>alert('你完蛋了')</script>
```html

转码后变为:
```js
&lt;script&gt;alert(&#39;你完蛋了&#39;)&lt;/script&gt;
```

这样的代码在 html 解析的过程中是无法执行的。

当然也可以利用关键词过滤的方式，将script标签给删除。那么现在就剩下空内容了。

**利用CSP**

CSP，即浏览器中的内容安全策略，它的核心思想就是服务器决定浏览器加载哪些资源，具体来说可以完成以下功能:

- 限制其他域下的资源加载。
- 禁止向其它域提交数据。
- 提供上报机制，能帮助我们及时发现XSS攻击。

**利用HttpOnly**

很多XSS攻击脚本都是用来窃取Cookie，而设置Cookie的HttpOnly属性后，JavaScript 便无法读取Cookie的值。这样也能很好的防范XSS攻击。

**总结**

XSS攻击是指浏览器中执行恶意脚本，然后拿到用户的信息进行操作。主要分为存储型、反射型和文档型。防范的措施包括:

- 一个信念: 不要相信用户的输入，对输入内容转码或者过滤，让其不可执行。
- 两个利用: 利用CSP，利用Cookie的HttpOnly属性。

## CSRF攻击

CSRF(Cross-site request forgery)，即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。

举个例子，你在某个论坛点击了黑客精心挑选的小姐姐图片，你点击后，进入了一个新的页面。

那么恭喜你，被攻击了:）

你可能会比较好奇，怎么突然就被攻击了呢？接下来我们就来拆解一下当你点击了链接之后，黑客在背后做了哪些事情。

可能会做三样事情。列举如下：

1. 自动发GET请求
  黑客网页里面可能有一段这样的代码：
  ```html
   <img src="https://xxx.com/info?user=hhh&count=100">
  ```
  进入页面后自动发送get请求，值得注意的是，这个请求会自动带上关于`xxx.com`的cookie信息(这里是假定你已经在`xxx.com`中登录过)。

  假如服务器端没有相应的验证机制，它可能认为发请求的是一个正常的用户，因为携带了相应的cookie，然后进行相应的各种操作，可以是转账汇款以及其他的恶意操作。

2. 自动发 POST 请求
  黑客可能自己填了一个表单，写了一段自动提交的脚本。
  ```html
  <form id='hacker-form' action="https://xxx.com/info" method="POST">
    <input type="hidden" name="user" value="hhh" />
    <input type="hidden" name="count" value="100" />
  </form>
  <script>document.getElementById('hacker-form').submit();</script>
  ```

  同样也会携带相应的用户cookie信息，让服务器误以为是一个正常的用户在操作，让各种恶意的操作变为可能。

3. 诱导点击发送 GET 请求
  在黑客的网站上，可能会放上一个链接，驱使你来点击:
  ```html
  <a href="https://xxx/info?user=hhh&count=100" target="_blank">点击进入修仙世界</a>
  ```
  点击后，自动发送`get`请求，接下来和自动发GET请求部分同理。

这就是CSRF攻击的原理。和XSS攻击对比，CSRF攻击并不需要将恶意代码注入用户当前页面的html文档中，而是跳转到新的页面，利用服务器的验证漏洞和用户之前的登录状态来模拟用户进行操作。

**防范措施**

1. 利用Cookie的SameSite属性
  CSRF攻击中重要的一环就是自动发送目标站点下的Cookie，然后就是这一份Cookie模拟了用户的身份。因此在Cookie上面做防范是不二之选。

  恰好，在Cookie当中有一个关键的字段，可以对请求中Cookie的携带作一些限制，这个字段就是SameSite。

  SameSite可以设置为三个值，Strict、Lax和None。
  
  a. 在Strict模式下，浏览器完全禁止第三方请求携带Cookie。比如请求`sanyuan.com`网站只能在`sanyuan.com`域名当中请求才能携带Cookie，在其他网站请求都不能。

  b. 在Lax模式，就宽松一点了，但是只能在get方法提交表单况或者a标签发送get请求的情况下可以携带Cookie，其他情况均不能。

  c. 在None模式下，也就是默认模式，请求会自动携带上Cookie。

2. 验证来源站点
   
  这就需要要用到请求头中的两个字段: Origin和Referer。

  其中，Origin只包含域名信息，而Referer包含了具体的URL路径。

  当然，这两者都是可以伪造的，通过Ajax中自定义请求头即可，安全性略差。

3. CSRF Token

  Django作为Python的一门后端框架，如果是用它开发过的同学就知道，在它的模板(template)中，开发表单时，经常会附上这样一行代码:
  ```python
  {% csrf_token %}
  ```

  这就是CSRF Token的典型应用。那它的原理是怎样的呢？

  首先，浏览器向服务器发送请求时，服务器生成一个字符串，将其植入到返回的页面中。

  然后浏览器如果要发送请求，就必须带上这个字符串，然后服务器来验证是否合法，如果不合法则不予响应。这个字符串也就是CSRF Token，通常第三方站点无法拿到这个token，因此也就是被服务器给拒绝。

**总结**

CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。

CSRF攻击一般会有三种方式:

- 自动GET请求
- 自动POST请求
- 诱导点击发送GET请求。

防范措施：利用Cookie的SameSite属性、验证来源站点和CSRF Token。

> 参考文档：[神三元](https://juejin.cn/post/6844904021308735502)

