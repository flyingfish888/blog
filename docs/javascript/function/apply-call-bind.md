# 模拟apply/call/bind

`call/apply/bind`的用法在[全面认识Function](/javascript/built-in-object/Function/index.md)可以看到，这里模拟以下这三个方法的实现

本身这个三个方法都是用来修改函数的this指向的，`call`和`apply`就是传参不一样，但是两个都是会在调用的时候同时执行调用的的函数，但是bind则会返回一个绑定了`this`的函数。

## this指向

普通函数的this指向是在函数调用的时候确定下来的，this指向大致分为5中

**1. 默认绑定**

```js

function test() {
  // 严格模式下是undefined
  // 非严格模式下是window
  console.log(this);
}
setTimeout(function () {
  // setTimeout的比较特殊
  // 严格模式和非严格模式下都是window
  console.log(this);
});

arr.forEach(function () {
  // 严格模式下是undefined
  // 非严格模式下是window
  console.log(this);
});

```

**2. 隐式绑定**

通俗的讲就是谁调用指向谁

```js

const obj = {
  name:'joy',
  getName(){
      console.log(this); //obj
      console.log(this.name); //joy
  }
};
obj.getName();

```

**3. 显式绑定**

`call/apply/bind`

```js

const obj1 = {
    name: 'joy',
    getName() {
        console.log(this); 
        console.log(this.name); 
    }
};

const obj2 = {
    name: 'sam'
};

obj1.getName.call(obj2); // obj2 sam
obj1.getName.apply(obj2); // obj2 sam
const fn = obj1.getName.bind(obj2);
fn(); // obj2 sam

```

**4. new 绑定**

```js

function Vehicle() {
    this.a = 2
    console.log(this);
}
new Vehicle(); // this指向Vehicle这个new出来的对象

```

**5. es6箭头函数**

es6的箭头函数比较特殊,箭头函数this为父作用域的this，不是调用时的this。

前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来.比较符合js的词法作用域吧。

```js

window.name = 'win';
const obj = {
    name: 'joy',
    age: 12,
    getName: () => {
        console.log(this); // 其父作用域this是window,所以就是window
        console.log(this.name); // win 
    },
    getAge: function () {
        // 通过obj.getAge调用,这里面this是指向obj
        setTimeout(() => {
            //所以这里this也是指向obj 所以结果是12
            console.log(this.age); 
        });
    }
};
obj.getName();
obj.getAge();

```

上面5中this绑定的优先级：

```

箭头函数 > new 绑定 > 显式绑定call/bind/apply > 隐式绑定 > 默认绑定

```

可以用**隐式绑定**的原理去修改默认绑定

## 模拟实现apply

```js

Function.prototype._apply = function(context, arg) {
  const thisArg = context || window;
  const params = arg ? arg : [];
  const key = Symbol();
  thisArg[key] = this;
  const result = thisArg[key](...params);
  delete thisArg[key];
  return result;
}

```

## 模拟实现call

```js

Function.prototype._call = function(context, ...arg) {
  const thisArg = context || window;
  const params = arg ? arg : [];
  const key = Symbol();
  thisArg[key] = this;
  const result = thisArg[key](...params);
  delete thisArg[key];
  return result;
}

```

## 模拟实现bind

bind和apply的区别在于：bind是返回一个绑定好的函数,apply是直接调用。

其实想一想实现也很简单，就是返回一个函数，里面执行了apply上述的操作而已。

不过有一个需要判断的点，因为返回新的函数，要考虑到使用new去调用，并且new的优先级比较高，所以需要判断new的调用。

还有一个特点就是bind调用的时候可以传参，调用之后生成的新的函数也可以传参，这两次传的参数需要拼接起来，一起传递给原始函数，所以这一块也要做处理。

因为上面已经实现了apply，这里就借用一下，实际上不借用就是把代码copy过来

```js

Function.prototype._bind = function(context, ...arg) {
  const fn = this;
  const args = arg ? arg: [];
  return function newFn(...params) {
    // 使用new的时候，this指向实例，实例继承自该函数，用这个判断是new调用
    if(this instanceof newFn) {
      return new fn(...args, ...params);
    };
    const result = fn._apply(context, [...args, ...params]);
    return result;
  }
}

```

> 参考文档：[面试感悟,手写bind,apply,call](https://juejin.cn/post/6844903891092389901)

> 大牛文档：[面试官问,能否模拟实现JS的bind方法](https://juejin.cn/post/6844903718089916429)
