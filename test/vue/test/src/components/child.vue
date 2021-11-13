<template>
  <div class="child">
    <h2>子组件</h2>
  </div>
</template>
<script>
export default {
  name: 'Child',
  data() {
    return {}
  },
  beforeCreate() {
    console.log('child::beforeCreate');
  },
  created() {
    console.log('child::created');
  },
  beforeMount() {
    console.log('child::beforeMount');
  },
  mounted() {
    console.log('child::mounted');
  },
  beforeDestroy() {
    console.log('child::beforeDestroy');
  },
  destroyed() {
    console.log('child::destroyed');
  }
};
</script>
<style lang='scss' scoped>
</style>
