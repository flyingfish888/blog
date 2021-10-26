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


