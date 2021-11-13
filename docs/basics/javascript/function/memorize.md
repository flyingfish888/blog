# 缓存函数

## 含义
缓存函数是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据

## 实现

```javascript

  const memoize = function(func, hashFn) {
    const memo = function(...arg) {
      const cache = memo.cache;
      const key = hashFn ? hashFn(arg) : JSON.stringify(arg);
      console.log('key::', key);
      if (!cache[key]) {
        console.log('no-cache');
        cache[key] = func.apply(this, arg);
      }
      return cache[key];
    }
    memo.cache = {};
    return memo;
  }

```

## 用途
- 降低部分复杂算法的时间复杂度，加速