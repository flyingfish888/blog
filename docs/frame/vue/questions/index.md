# 问题

## 1. 未做响应式绑定的变量，因为其它值的改变重新渲染了

代码如下：

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <div>{{ age1 }}</div>
    <div @click="change">点击</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    age1() {
      return this.user.age + 1;
    }
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    change() {
      this.user.name = Math.random();
      this.user.age = Math.random() * 10;
    }
  }
}
</script>
```

**问题： **
当user初始化几没有name也没有age的时候，点击触发change事件页面内容不渲染，符合响应式绑定
但是当user里面有name没有age的时候，点击触发change事件，页面中name和age都进行了重新渲染，好像age也有了响应式，而实际看vue-tools是没有age属性的，computed中的age1始终为NaN

原因？