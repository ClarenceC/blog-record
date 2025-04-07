---
title: JavaScript构建类的方法总结
pubDate: 2017-08-17
categories: JavaScript
tags: ['JavaScript构建类', 'JavaScript Class', 'JavaScript 继承']
image: 
  url: ''
  alt: ''
author: 'Clarence.C'
description: 'JavaScript 语言是不支持"类"的, 但是可以用一些其它的方法,模拟出"类"'
---

## 构造函数方式
```javascript
/**
 * Person类：定义一个人，有个属性name，和一个getName方法
 * @param {String} name
 */
    function Person(name) {
        this.name = name;
        this.getName = function() {
            return this.name;
        }
    }

    //生成方式
    var p1 = new Person("Jack");
    var p2 = new Person("Tom");
    console.log(p1 instanceof Person);//true
    console.log(p2 instanceof Person);//true
```

这种风格让写过Java 和C #的有点亲切在于构造一个对象需要配置一些参数，参数要赋值给类里面this。但与Java的区别是JS用function来代替class，参数也无需定义类型。
**优点** 优点很明显 私有变量,快速构建,可以根据参数来构造不同的对象实例 ，
**缺点** 是构造时每个实例对象都会生成getName方法版本，造成了内存的浪费 。

## 原型方式
```javascript
/**
 * Person类：定义一个人，有个属性name，和一个getName方法
 */
function Person(){}
Person.prototype.name = "jack";
Person.prototype.getName = function() { return this.name;}

//生成方式
var p1 = new Person();
var p2 = new Person();
console.log(p1.getName());//jack
console.log(p2.getName());//jack
```
可以看出输出的都是jack，原型方式的缺点就是不能通过参数来构造对象实例 (一般每个对象的属性是不相同的) ，优点是所有对象实例都共享getName方法（相对于构造函数方式），没有造成内存浪费 。

## 组合方式
```javascript
/**
 * Person类：定义一个人，有个属性name，和一个getName方法
 * @param {String} name
 */
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getName = function() {
        return this.name;
    }
or
    function Person(name) {
        this.name = name;
        Person.prototype.getName = function() {
            return this.name;
        }
    }

    // 生成
    var p1 = new Person("Jack");
    var p2 = new Person("Tom");
    console.log(p1.getName());//Jack
    console.log(p2.getName());//Tom
```
这样，即可通过构造函数构造不同name的人，对象实例也都共享getName方法，不会造成内存浪费。

## Object.create() 方法
为了解决生成对象麻烦，Javascript国际标准提出一个新的方法Object.create()。用这个方法，“类”就是一个对象，不是函数。

```javascript
var Dog = {
    name = "WangCai";
    makeSound: function() {
        alter('wangwangwang');
    }
}

// 生成
var dog = Object.create(Dog);
alert(dog.name);
dog.makeSound();

```

使用Object.create()生成实例,不需要用到new.
> new关键字掩盖了Javascript中真正的原型继承，使得它更像是基于类的继承。其实new关键字只是Javascript在为了获得流行度而加入与Java类似的语法时期留下来的一个残留物.

使用new和使用object.create方法都是将对象添加到原型上去,但是里面有什么区别呢?这关乎于原型链的问题.如果创建的类有父类new建的类_proto会引用父类的构造函数.而如果object.create建的类父类是直接引用最顶层的Object类构建.

## 极简主义
这种方法不使用this和prototype，代码部署起来非常简单，这大概也是它被叫做"极简主义法"的原因。 首先，它也是用一个对象模拟"类"。在这个类里面，定义一个构造函数createNew()，用来生成实例。
然后，在createNew()里面，定义一个实例对象，把这个实例对象作为返回值。
```javascript
var Dog = {
    createNew: function(){
        var dog = {};
        dog.name = "wangcai";
        dog.makeSound = function(){
            alert('wangwangwang');
        }
        return dog;
    }
};

// 生成
var dog = Dog.createNew();
dog.makeSound();
```
这种方法的好处是，容易理解，结构清晰优雅，符合传统的"面向对象编程"的构造，因此可以方便地部署下面的特性。

## 极简主义的继承
让一个类继承另一个类，实现起来很方便。只要在前者的createNew()方法中，调用后者的createNew()方法即可。 先定义一个Animal类。

然后，在Dog的createNew()方法中，调用Animal的createNew()方法。

这样得到的Cat实例，就会同时继承Cat类和Animal类。

```javascript
var Animal = {
    createNew: function(){
        var animal = {};
        animal.sleep = function(){
            alert('sleep');
        }
    }
};

var Dog = {
    createNew: function(){
        var dog = Animal.createNew();
        dog.name = 'doki'; 
        var sound = 'bibibi';// private
        dog.makeSound = {
            alert('wangwangwang);
        }
        return dog;
    }
}

```
在createNew()方法中，只要不是定义在dog对象上的方法和属性，都是私有的。上例的内部变量sound，外部无法读取，只有通过dog的公有方法makeSound()来读取。

# JavaScript 继承
其实继承的方式和类的构建方式很像

## 类式继承(构造函数)
JS中其实是没有类的概念的，所谓的类也是模拟出来的。特别是当我们是用new 关键字的时候，就使得“类”的概念就越像其他语言中的类了。类式继承是在函数对象内调用父类的构造函数，使得自身获得父类的方法和属性。call和apply方法为类式继承提供了支持。通过改变this的作用环境，使得子类本身具有父类的各种属性。

```javascript
var father = function() {
 
  this.age = 52;
  this.say = function() {
    alert('hello i am '+ this.name ' and i am '+this.age + 'years old');
  }
}
var child = function() {
  this.age = 32;
  this.name = 'bill';
  father.call(this);
 
}
var man = new child();
man.say(); // hello i am bill and i am 52 years old
```
可以看出输出的都是jack，原型方式的缺点就是不能通过参数来构造对象实例 (一般每个对象的属性是不相同的) ，优点是所有对象实例都共享getName方法（相对于构造函数方式），没有造成内存浪费 。


## 原型继承
原型继承在开发中经常用到。它有别于类继承是因为继承不在对象本身，而在对象的原型上（prototype）。每一个对象都有原型，在浏览器中它体现在一个隐藏的__proto__属性上。在一些现代浏览器中你可以更改它们。比如在zepto中，就是通过添加zepto的fn对象到一个空的数组的__proto__属性上去，从而使得该数组成为一个zepto对象并且拥有所有的方法。话说回来，当一个对象需要调用某个方法时，它回去最近的原型上查找该方法，如果没有找到，它会再次往下继续查找。这样逐级查找，一直找到了要找的方法。 这些查找的原型构成了该对象的原型链条。原型最后指向的是null。我们说的原型继承，就是将父对像的方法给子类的原型。子类的构造函数中不拥有这些方法和属性。

```javascript
var father = function() { }
 
father.prototype.a = function() {}
 
var child = function(){}
 
//开始继承
child.prototype = new father();
var man = new child();
man.a();
```
## 对比
和原型对比起来，构造函数（类）式继承有什么不一样呢？首先，构造函数继承的方法都会存在父对象之中，每一次实例，都回将funciton保存在内存中，这样的做法毫无以为会带来性能上的问题。其次类式继承是不可变的。在运行时，无法修改或者添加新的方法，这种方式是一种固步自封的死方法。而原型继承是可以通过改变原型链接而对子类进行修改的。另外就是类式继承不支持多重继承，而对于原型继承来说，你只需要写好extend对对象进行扩展即可。

| 基于类的继承 | 原型继承       |
| :-------------:|:-------------:|
| 类是不可变的。在运行时，你无法修改或者添加新的方法      | 原型是灵活的。它们可以是不可变的也可以是可变的 |
| 类可能会不支持多重继承      | 对象可以继承多个原型对象      |
| 基于类的继承比较复杂。你需要使用抽象类，接口和final类等等 | 原型继承比较简洁。你只有对象，你只需要对对象进行扩展就可以了      |



## 组合模式
另外的一种模式，是结合类继承和原型继承的各自优点来进行对父类的继承。用类式继承属性，而原型继承方法。这种模式避免了属性的公用，因为一般来说，每一个子类的属性都是私有的，而方法得到了统一。这种模式称为组合模式，也是继承类式常用到的一种方法。

```javascript
function father() {
  this.a = 'father'  
}
 
father.prototype.b = function() {
   alert(this.a)
}
 
var child = function() {
  father.call(this)
}
 
child.prototype = new father();
```


# 总结

# 参考连接
- [JS 系列一： Javascript 定义类（class）的三种方法](http://www.jianshu.com/p/57425495d6ac)
- [JS原型继承和类式继承](http://web.jobbole.com/83319/)
- [JavaScript的写类方式 Snandy](http://www.cnblogs.com/snandy/archive/2011/03/06/1971764.html)