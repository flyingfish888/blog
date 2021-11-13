# 数组中查找

数组自身提供一些查找方法，这里自己手写一个算法进行查找

```js

const arr = [1, 3, 2, 5, 4, 8, 5, 6, 9, 7];
     
function search(nums, target) {
  const sort_arr = nums.map((val, index) => ({index, val}))
                      .sort((a, b) => a.val - b.val);
  function fn(temp_arr) {
    const midI = Math.floor(temp_arr.length/2);
    const midV = temp_arr[midI].val;
    if (+midV === +target) {
      return temp_arr[midI].index;
    }
    // 未找到
    if (+midI === 0) {
      return -1;
    }
    // 二分
    if (+midV > +target) {
      const temp = temp_arr.slice(0, midI);
      return fn(temp);
    }
    if (+midV < +target) {
      const temp = temp_arr.slice(midI);
      return fn(temp);
    }
  }
  return fn(sort_arr);
}

console.log(search(arr, 8)); // 5

```

::: warning

上面算法，对无序数组做了排序，然后用二分法进行查找。
实际上：如果是无序数组，则直接遍历数组进行查找，时间复杂度为`O(n)`，使用上面方法后，排序+二分时间负责度反而比`O(n)`要大
如果是有序数组，则使用二分法比较好，这样时间复杂度就是`O(log2(n))`

:::