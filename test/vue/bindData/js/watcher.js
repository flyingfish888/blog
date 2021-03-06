function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更容易理解
  this.value = this.get();
}
Watcher.prototype = {
  update: function() {
    this.run(); // 属性值变化收到通知
  },
  run: function() {
    const value = this.get(); // 取到最新值
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue); // 执行compile中绑定的回调，更新视图
    }
  },
  get: function() {
    Dep.target = this; // 将当前订阅者指向自己
    const value = this.vm[exp]; // 这里会触发属性的getter，添加自己到属性订阅器中
    Dep.target = null; // 添加完毕，重置
    return value;
  }
}