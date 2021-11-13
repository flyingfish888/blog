// https://book.penblog.cn/src/%E6%B7%B1%E5%85%A5%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E6%9E%84%E5%BB%BA-%E4%B8%8A.html#76-%E6%9E%81%E7%AE%80%E9%A3%8E%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F

window.onload = function() {
  class MyVue {
    constructor(options) {
      this.options = options;
      this.initData(options);
      let el = this.options.id;
      this.$mount(el);
    }
    initData(options) {
      if(!options.data) return;
      this.data = options.data;
      new Observer(options.data);
    }
    $mount(el) {
      const element = document.getElementById(el);
      let innerHtml = element.innerHTML;
      let key = innerHtml.match(/{(\w+)}/)[1];
      const updateView = () => {
        element.innerHTML = this.options.data[key]
      }
      new Watcher(updateView)
    }
  }
  // watcher
  class Watcher {
    constructor(expOrFn) {
      this.getter = expOrFn;
      this.get();
    }
    get() {
      Dep.target = this
      this.getter();
      // Dep.target = null;
    }
    update() {
      this.get();
    }
  }
  // Dep
  let uid = 0;
  class Dep {
    constructor() {
      this.uid = uid++;
      this.subs = [];
    }
    depend() {
      if (Dep.target) {
        this.subs.push(Dep.target);
        Dep.target = null;
      }
    }
    notify() {
      const subs = this.subs.slice();
      subs.forEach(item => {
        item.update();
      })
    }
  }
  Dep.target = null;
  // observes
  class Observer {
    constructor(data) {
      this.walk(data);
    }

    walk(obj) {
      const keys = Object.keys(obj);
      keys.forEach(key => {
        this.defineReactive(obj, key);
      });
    }

    defineReactive(obj, key) {
      const dep = new Dep();
      const property = Object.getOwnPropertyDescriptor(obj, key);
      let val = obj[key];
      if (property && property.configurable === false) return;
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
          if (Dep.target) {
            dep.depend();
          }
          return val;
        },
        set(nval) {
          if (nval === val) {
            return;
          }
          val = nval;
          dep.notify();
        }
      })
    }
  }
  window.my = new MyVue({
    id: 'app',
    data: {
      a: 1,
      b: 2
    }
  })
  window.dep = Dep;
}