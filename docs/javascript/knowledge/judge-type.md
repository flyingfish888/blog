# 数据类型判断


## Object.prototype

```js

  Object.prototype.toString.call(1); // "[object Number]"
  Object.prototype.toString.call('1'); // "[object String]"
  Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
  Object.prototype.toString.call(true); // "[object Boolean]"
  Object.prototype.toString.call(null); // "[object Null]"
  Object.prototype.toString.call(undefined); // "[object Undefined]"
  Object.prototype.toString.call([]); // "[object Array]"
  Object.prototype.toString.call({}); // "[object Object]"
  Object.prototype.toString.call(() => {}); // "[object Function]"
  Object.prototype.toString.call(new Date()); // "[object Date]"

```

## typeof

```js

  typeof 1; // "number"
  typeof '1'; // "string"s
  typeof Symbol(1); // "symbol"
  typeof true; // "boolean"
  typeof undefined; // "undefined"
  typeof null; // "object"
  typeof []; // "object"
  typeof {}; // "object"
  typeof new Date(); // "object"
  typeof (() => {}); // "function"

```