# 函数平铺

## 含义

- 嵌套执行指的是一个函数的返回值将作为另一个函数的参数

- 将需要嵌套执行的函数平铺

## 实现

```javascript

  const compose = function(...args) {
    return function(x) {
      return args.reduceRight((total, current) => {
        return current(total);
      }, x);
    }
  }
  // 示例
  let add = x => x+10;
  let multiply = y => y*10;
  console.log(multiply(add(10))); // 200

  let calculate = compose(multiply, add);
  console.log(calculate(10)); // 200

```

## 用途

- 处理的问题：一个函数的结果将作为另一个函数的参数进行调用，正常情况我们需要一个函数嵌套另一个函数
- 方案：将函数作为参数，传递给某个函数，此函数返回一个新的函数，完成上述调用
- compose将参数按照从右向左的顺序执行
- pipe将参数按照从左向右的顺序执行