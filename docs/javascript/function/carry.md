# 函数柯里化

## 含义
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一些列使用一个参数的函数技术（把接受多个参数的函数转换成几个单一参数的函数）

## 实现

```javascript
  // 非柯里化函数
  function originFn (...arg) {
    let sum = 0;
    arg.forEach(item => sum += item);
    return sum;
  }
  function addFn(n1) {
    return function(n2) {
      return function(n3) {
        return function(n4) {
          return n1+n2+n3+n4;
        }
      }
    }
  }
  console.log(addFn(1)(2)(3)(4));
  // 进行柯里化处理
  function carry(fn) {
    let allArg = [];
    return function next(...arg) {
      console.log(arg);
      if (arg.length > 0) {
        allArg = allArg.concat(arg);
        return next;
      }
      const res = fn.apply(null, allArg);
      allArg = [];
      return res;
    }
  }
  const res = carry(originFn);
  console.log(res(1)(2)(3,1)(4)(5)());
  console.log(res(1)(2)(3,1)(4)(5)());

```

## 用途
 - 将多个参数改为单个参数
 - 注：此处处理需要明确参数个数，然后进行转换