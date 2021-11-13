# 模拟new

**new做了什么**

1. 创建了一个全新的对象。
2. 这个对象会被执行`[[Prototype]]`（也就是`__proto__`）链接。
3. 生成的新对象会绑定到函数调用的this。
4. 通过new创建的每个对象将最终被`[[Prototype]]`链接到这个函数的`prototype`对象上。
5. 如果函数没有返回对象类型`Object`（包含`Function/Array/Date/RegExp/Error`)，那么new表达式中的函数调用会自动返回这个新对象。

**模拟实现**

```js
function toNew(fn) {
  // 判断第一参数是不是函数
  if (typeof fn !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  // 创建一个对象，并且原型继承自fn.prototype
  const obj = Object.create(fn.prototype);
  // 获取除构造函数之外的参数
  const params = [].slice.call(arguments, 1);
  // 用obj改变构造函数的this指向，并执行
  const res = fn.apply(obj, params);
  // 判断返回的结果是什么数据类型的
  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  if (isObject || isFunction) {
    return res;
  }
  return obj;
}

```

> 参考文档： [面试官问，能否模拟实现JS的new操作符](https://juejin.cn/post/6844903704663949325)

