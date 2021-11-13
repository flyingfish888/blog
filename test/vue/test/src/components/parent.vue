<template>
  <div class="hello">
    <h1>父组件</h1>
    <child></child>
  </div>
</template>

<script>
import Child from './child.vue';
export default {
  name: 'Parent',
  components: {
    Child
  },
  beforeCreate() {
    console.log('parent::beforeCreate');
  },
  created() {
    console.log('parent::created');
  },
  beforeMount() {
    console.log('parent::beforeMount');
  },
  mounted() {
    console.log('parent::mounted');
  },
  beforeDestroy() {
    console.log('parent::beforeDestroy');
  },
  destroyed() {
    console.log('parent::destroyed');
  }
}
</script>
