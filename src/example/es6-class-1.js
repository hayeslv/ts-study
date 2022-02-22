// !es5使用构造函数创建实例对象
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.getPosition = function() {
  return '(' + this.x + ', ' + this.y + ')';
}
var p1 = new Point(2, 3);
console.log(p1);
console.log(p1.getPosition());
var p2 = new Point(4, 5);
console.log(p2.getPosition());

// !es6使用class来定义构造函数
class Point1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // return { a: 'a1' }; // 如果这里有return，就不是这个类的实例对象了
  }
  getPosition() {
    return `(${this.x}, ${this.y})`
  }
}
const p3 = new Point1(10, 20);
console.log(p3.getPosition());

// !查看属性是否是自身拥有的
console.log(p3.hasOwnProperty('x')); // true
console.log(p3.hasOwnProperty('getPosition')); // false
console.log(p3.__proto__.hasOwnProperty('getPosition')); // true：getPosition实际上是p3继承来的

// !set、get
var info = {
  _age: 18,
  set age(newVal) {
    if(newVal > 18) {
      console.log('怎么变老了？');
    } else {
      console.log('haha，我还年轻');
    }
  },
  get age() {
    console.log('你问我年龄干嘛');
    return this._age
  }
}
console.log(info.age);
info.age = 17

class Info {
  constructor(age) {
    this._age = age;
  }
  set age(newVal) {
    this._age = newVal;
  }
  get age() {
    return this._age;
  }
}

// !class表达式
// 函数定义
const func1 = function() {};
function func2() {};
// class定义
class Infos1 {
  constructor() {}
}
const Infos2 = class c {
  constructor() {}
}
const Infos3 = class {
  constructor() {}
}

// !静态方法
class PointStatic {
  // static z1 = 2; // 静态属性
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getPosition() {
    return `(${this.x}, ${this.y})`
  }
  // 类的静态方法，实例是无法继承的
  static getClassName() {
    return PointStatic.name;
  }
}
// PointStatic.z = 2; // 静态属性
const p = new Point(1, 2);
console.log(p.getPosition()); // (1, 2)
// console.log(p.getClassName()); // Error：p.getClassName is not a function
console.log(PointStatic.getClassName()); // PointStatic








