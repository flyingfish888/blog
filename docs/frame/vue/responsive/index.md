# 响应式原理

以`MyVue`作为类响应式框架，模拟vue源码的实现思路。

**初始化实例**

```js

  const vm = new MyVue({
    id: '#app',
    data: {
      test: 12
    }
  })

```

**MyVue.js**

```js

class MyVue {
  constructor(options) {
    this.options = options;
    // 初始化数据
    this.initData(options);
    let el = this.options.id;
    // 挂载实例
    this.$mount(el);
  }
  initData(options) {
    if (!options.data) {
      return;
    }
    this.data = options.data;
    // 绑定数据响应式
    new Observer(options.data);
  }
  $mount(el) {
    const updateView = _ => {
      let innerHtml = document.querySelector(el).innerHTML;
      let key = innerHtml..match(/{(\w+)}/);
      document.querySelector(el).innerHTML = this.options.data[key]
    }
    // 创建一个渲染的依赖。
    new Watcher(updateView, true)
  }
}

```

**设置响应式对象 - Observer**

首先引入一个类`Observer`，这个类的目的是将数据变成响应式对象，利用`Object.defineProperty`对数据的`getter,setter`方法进行改写。在数据读取`getter`阶段我们会进行依赖收集，在数据修改`setter`阶段，我们会进行依赖更新。因此在数据初始化阶段，我们会利用`Observer`这个类将数据对象改为响应式对象，而这是所有流程的基础。

`defineReactive`方法会重写对象的`getter,setter`方法，在开始会实例化一个`Dep`，也就是创建一个数据的依赖管理。在重写的`getter`方法中会进行依赖的收集，也就是调用`dep.depend`的方法。在`setter`阶段，比较两个数的不同后，会调用依赖的派发更新，即`dep.notify`。

```js

class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key);
    })
  }

  defineReactive(obj, key) {
    const dep = new Dep();
    const property = Object.getOwnPropertyDescriptor(obj);
    let val = obj[key];
    if (property && property.configurable === false) {
      return;
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function() {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function(newVal) {
        if (val === newVal) return;
        val = newVal;
        dep.notify();
      }
    })
  }
}

```

**依赖本身 - Watcher**

一个`Watcher`实例就是一个依赖，数据不管是在渲染模板时使用还是在数据计算时使用，都可以算作一个需要监听的依赖，`Watcher`中记录着这个依赖监听的状态，以及如何更新操作的方法。

实例化`Watcher`时会将`Dep.target`设置为当前`Watcher`，执行完状态更新函数后，再将`Dep.target`置空。这样在收集依赖时只要将`Dep.target`当前的`Watcher push`到`Dep`的`subs`数组即可。而在派发更新阶段也只需要重新更新状态即可。

```js

class Watcher {
  constructor (expOrFn) {
    this.getter = expOrFn;

    this.get();
  }

  get() {
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }

  update() {
    this.get();
  }
}

```

**依赖管理 - Dep**

`Watcher`如果理解为每个数据需要监听的依赖，那`Dep`可以理解为依赖的一种管理。数据可以在渲染中使用，也可以咋计算属性中使用。相应的每个数据对应的Watcher也有很多。而我们在更新数据时，如何通知到数据相关的每一个依赖，就需要Dep进行数据管理了。并且浏览器同一时间，只能更新一个`Watcher`，所以也需要一个属性去记录当前更新的Watcher。而Dep这个类只需要做两件事，将依赖进行收集，派发依赖进行更新。

```js

let uid = 0;
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  // 依赖收集
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
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

```

**响应式原理设计的核心**

- `Observer`类，实例化一个`Observer`类会通过`Object.defineProperty`对数据`getter,setter`方法进行改写，在`getter`阶段进行依赖收集，在数据发生更新阶段，触发`setter`方法进行依赖的更新。
- `Watcher`类，实例化`Watcher`类相当于创建一个依赖，简单的理解就是数据在哪里被使用就需要产生一个依赖。当数据发生改变时，会通知到每个依赖进行更新，前面提到的渲染`Watcher`便是渲染`Dom`时使用数据产生的依赖。
- `Dep`类，既然`Watcher`理解为每个数据需要监听的依赖，那么对这些依赖的收集和通知则需要另一个类来管理，这个类便是`Dep`，`Dep`只需要做两件事，依赖手机和派发依赖更新。

> 参考文档： [深入响应式系统构建](https://book.penblog.cn/src/%E6%B7%B1%E5%85%A5%E5%93%8D%E5%BA%94%E5%BC%8F%E7%B3%BB%E7%BB%9F%E6%9E%84%E5%BB%BA-%E4%B8%AD.html)