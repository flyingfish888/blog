# 函数防抖

## 含义
当持续触发事件时，一定时间段内没有触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时，‘函数防抖’的关键在于，在一个动作发生一定时间之后，才会执行特定的事件

## 实现

```html

  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>防抖</title>
    <style>
      #square{
        width: 1000px;
        height: 1000px;
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div id="square"></div>
  </body>
  <script>
    const debounce = function(fn, delay, immediate) {
      let timer = null, result;
      const debounce = function(...arg) {
        timer && clearTimeout(timer);
        if (immediate) {
          if (!timer) result = fn.apply(this, arg);
          timer = setTimeout(() => {
            timer = null;
          }, delay);
        } else {
          timer = setTimeout(() => {
            result = fn.apply(this, arg);
          }, delay)
        }
        return result;
      }
      debounce.cancel = function() {
        timer && clearTimeout(timer);
        timer = null;
      }
      return debounce;
    }
    const square = document.getElementById('square');
    function test (e) {
      console.log(e);
    }
    square.onmousemove = debounce(test, 1000, true);
  </script>
  </html>

```

## 用途

- 当immediate为false时，函数不会在调用时立即执行，而是在函数最后一次被调用后delay时间后才执行
- 当immediate为true时，函数会在第一次调用时立即执行，在之后重复调用不执行，只有当delay时间内一次也未被调用时，才会在下一次调用时再次调用
- 当用户点击按钮访问接口时，避免重复点击造成重复提交
- 当输入框不断输入内容，根据输入内容做接口匹配时，避免重复不断调用，只在最后调用
