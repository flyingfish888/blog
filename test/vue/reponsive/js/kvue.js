// eslint-disable-next-line no-unused-vars
class KVue {
  constructor(options) {
    this.options = options;
    this.$data = options.data;
    this.observe(this.options);
  }

  observe(val) {
    if (!val && typeof val !== 'object') {
      return;
    }
    Object.keys(val).forEach(key => {
      this.defineReactive(val, key);
    })
  }
  defineReactive(obj, key) {
    if (typeof obj[key] === 'object') {
      this.observe(obj[key]);
    }
    let val = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        console.log(`${key}属性更新了：${val}更新了`);
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach(dep => { dep.update() });
  }
}

class Watcher {
  constructor() {
    Dep.target = this;
  }
  update() {
    console.log('更新了');
  }
}

class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    if (this.$el) {
      this.$fragment = this.node2fragment(this.$el);

      this.compile(this.$fragment);

      this.$el.appendChild(this.$fragment);
    }
  }

  node2fragment(el) {
    const frag = document.createDocumentFragment();
    let child;
    while(child === el.firstChild) {
      frag.appendChild(child);
    }
    return frag;
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(element => {
      if (this.isElement(element)) {
        console.log('编译元素');
      } else if (this.isInterpolation(element)) {
        this.compileText(element);
      }

      if (element.childNodes && element.childNodes.length > 0) {
        this.compile(element)
      }
    })
  }
}