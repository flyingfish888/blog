var data = { name: 'kinder' };
observe(data);

// 监听
function observe(data) {
  if (!data || typeof data !== 'object') return;
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  })
}

// 响应
function defineReactive(data, key, val) {
  const dep = new Dep();
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能在define
    get: function() {
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      console.log('哈哈哈，监听到值变化了', val, '===>', newVal);
      val = newVal;
      dep.notify(); // 通知所有订阅者
    }
  })
}

// 消息订阅器
function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}