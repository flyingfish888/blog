<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <div>{{ age1 }}</div>
    <parent v-if="showHello"/>
    <div @click="change">点击</div>
  </div>
</template>

<script>
import Parent from './components/parent.vue'

export default {
  name: 'App',
  components: {
    Parent
  },
  computed: {
    age1() {
      return this.user.age + 1;
    }
  },
  data() {
    return {
      showHello: true,
      user: {
      }
    }
  },
  created() {
  },
  methods: {
    change() {
      this.user.name = Math.random();
      this.user.age = Math.random() * 10;
      // this.showHello = !this.showHello;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
