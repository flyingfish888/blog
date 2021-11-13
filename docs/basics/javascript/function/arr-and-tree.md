# 扁平数组&树形数组

**扁平数组**

```js

const array = [
  { name: '一级', id: 1, pid: 0},
  { name: '一级子级1', id: 11, pid: 1},
  { name: '一级子级2', id: 12, pid: 1},
  { name: '二级', id: 2, pid: 0},
  { name: '二级子级1', id: 21, pid: 2},
  { name: '二级子级2', id: 22, pid: 2},
  { name: '三级', id: 3, pid: 0},
  { name: '三级子级1', id: 31, pid: 3},
  { name: '三级子级1', id: 32, pid: 3},
  { name: '三级子级1', id: 33, pid: 3},
  { name: '一1级子级1', id: 111, pid: 11},
  { name: '一1级子级2', id: 112, pid: 11},
  { name: '一1级子级3', id: 121, pid: 12},
  { name: '一1级子级4', id: 122, pid: 12},
  { name: '二1级子级1', id: 211, pid: 21},
  { name: '二1级子级2', id: 212, pid: 21},
  { name: '二1级子级3', id: 221, pid: 22},
  { name: '二1级子级4', id: 222, pid: 22},
  { name: '三1级子级1', id: 311, pid: 31},
  { name: '三1级子级2', id: 312, pid: 31},
  { name: '三1级子级3', id: 321, pid: 32},
  { name: '三1级子级4', id: 322, pid: 33},
];

```

**树形数组**

```js

const treeArr = [
  { name: '一级', id: 1, children: [
    { name: '一级子级1', id: 11, children: [
      { name: '一1级子级1', id: 111, children: []},
      { name: '一1级子级2', id: 112, children: []}
    ]},
    { name: '一级子级2', id: 12, children: [
      { name: '一1级子级3', id: 121, children: []},
      { name: '一1级子级4', id: 122, children: []}
    ]},
  ]}, 
  { name: '二级', id: 2, children: [
    { name: '二级子级1', id: 21, children: [
      { name: '二1级子级1', id: 211, children: []},
      { name: '二1级子级2', id: 212, children: []}
    ]},
    { name: '二级子级2', id: 22, children: [
      { name: '二1级子级3', id: 221, children: []},
      { name: '二1级子级4', id: 222, children: []},
    ]},
  ]}, 
  { name: '三级', id: 3, children: [
    { name: '三级子级1', id: 31, children: [
      { name: '三1级子级1', id: 311, children: []},
      { name: '三1级子级2', id: 312, children: []},
    ]},
    { name: '三级子级1', id: 32, children: [
      { name: '三1级子级3', id: 321, children: []},
    ]},
    { name: '三级子级1', id: 33, children: [
      { name: '三1级子级4', id: 322, children: []},
    ]},
  ]}
];

```

**扁平转树形**

*方法一：两层循环，时间复杂度`O(n^2)`*

```js

function arrToTree(arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  arr.forEach(item => {
    arr.forEach(it => {
      if (it.pid === item.id) {
        !item.children && (item.children = [])
        item.children.push(it);
      }
    })
  });
  return arr.filter(item => item.pid === 0);
}

```

*方法二：通过对象，找到父级，时间复杂度`O(n)`*

```js

function arrToTree(arr) {
  const obj = {};
  const target = [];
  arr.forEach(item => {
    obj[item.id] = item;
  });
  arr.forEach(item => {
    if (obj[item.pid]) {
      !obj[item.pid].children && (obj[item.pid].children = []);
      obj[item.pid].children.push(item);
    } else {
      target.push(item);
    }
  });
  return target;
}

```

::: tip

核心都是利用的引用对象的特性，各自找到子节点，父子孙就自动连续起来了

:::

**树形转扁平**

```js

function treeToArr(tree, pid = 0) {
  const target = [];
  tree.forEach(item => {
    item.pid = pid;
    target.push(item);
    if (item.children) {
      target.push(...treeToArr(item.children, item.id));
      delete item.children
    }
  });
  return target;
}

```