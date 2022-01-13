// !es5的继承
// 修改原型链
function Food() {
  this.type = 'food';
}
Food.prototype.getType = function() {
  return this.type;
}
function Vegetables(name) {
  this.name = name;
}
Vegetables.prototype = new Food();
const tomato = new Vegetables('tomato')
console.log(tomato.getType());

// !es6类的继承
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  static getNames() {
    return this.name;
  }
}
class Child extends Parent{
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
const c = new Child('dylan', 18);
console.log(c);
console.log(c.getName());
console.log(Child.getNames()); // Child

console.log(Object.getPrototypeOf(Child) === Parent); // true：说明Child的原型就是Parent

// !super
// super作为函数时作为父类的构造函数 constructor
// super作为对象
// -- 在普通方法中 => 父类的原型对象
// -- 在静态方法中 => 父类
class Parent1 {
  constructor() {
    this.type = 'parent';
  }
  getName() {
    return this.type;
  }
}
Parent1.getType = () => {
  return 'is parent'
}
class Child1 extends Parent1 {
  constructor() {
    super();
    console.log('constructor: '+ super.getName());
  }
  getParentName() {
    console.log('getParentName: '+ super.getName());
  }
  // getParentType() {
  //   console.log('getParentType: ' + super.getType());
  // }
  static getParentTypeStatic() {
    console.log('getParentType: ' + super.getType());
  }
}
const child1 = new Child1();
child1.getParentName();
// child1.getParentType(); // Error：因为super指代的是父类的原型对象，而不是父类本身
Child1.getParentTypeStatic(); // getParentType: is parent

// !prototype 和 __proto__
// __proto__ 指向对应函数的 prototype 属性
var objs = new Object();
console.log(objs.__proto__ === Object.prototype); // true
// 子类的 __proto__ 指向父类本身
// 子类的 prototype 属性的 __proto__ 指向父类的 prototype 属性
// 实例的 __proto__ 属性的 __proto__ 指向父类实例的 __proto__

