// !装饰使用
// function setProp(target) {
//   // ...
// }
// @setProp

// !装饰工厂
// function setProp() {
//   return function(target) {
//     // ...
//   };
// }
// @setProp()

// !组合使用多个装饰器：如果是装饰器工厂，是从上至下去生成装饰器。实际装饰器的顺序是从下至上依次执行
// @setProp()
// @setName
// @setAge

// function setName() {
//   console.log('get setName');
//   return (target) => {
//     console.log('setName');
//   };
// }
// function setAge() {
//   console.log('get setAge');
//   return (target) => {
//     console.log('setAge');
//   };
// }
// @setName()
// @setAge()
// class ClassDec { // 输出：get setName => get setAge => setAge => setName
//   constructor(){}
// }

// !类装饰器：在类声明之前声明
// let sign: any = null;
// function setName(name: string) {
//   return (target: new() => any) => {
//     sign = target;
//     console.log(target.name);
//   };
// }
// @setName('dylan') // 输出：ClassDec2
// class ClassDec {
//   constructor() {}
// }
// console.log(sign === ClassDec); // true
// console.log(sign === ClassDec.prototype.constructor); // true
// console.log('============');

// !通过装饰器可以修改类的原型对象和构造函数
// function addName(constructor: new() => any) {
//   constructor.prototype.name = 'dylan';
// }
// @addName
// class ClassD{} // 声明合并
// interface ClassD {
//   name: string;
// }
// const d = new ClassD();
// console.log(d.name);

// !修改类的实现
// function classDecorator<T extends new(...args: any[]) => {}>(target: T) {
//   return class extends target {
//     public newProperty = 'new property';
//     public hello = 'override';
//   };
// }
// @classDecorator
// class Greeter {
//   public property = 'property';
//   public hello: string;
//   constructor(m: string) {
//     this.hello = m;
//   }
// }
// console.log(new Greeter('world'));

// !js：属性描述符
// configurable：可配置
// writeable：可写
// enumerable：可枚举

// !方法装饰器
// function enumerable(bool: boolean) {
//   // target：类的原型对象；propertyName：方法的名字；descriptor：对象（属性描述符）
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     console.log(target);
//     descriptor.enumerable = bool;
//   };
// }
// class ClassF {
//   constructor(public age: number) {}
//   @enumerable(false)
//   public getAge() {
//     return this.age;
//   }
// }
// const classF = new ClassF(18);
// console.log(classF);
// for(const key in classF) { console.log(key); }
// console.log('==========');


// function enumerable(bool: boolean): any {
//   // target：类的原型对象/构造函数；propertyName：方法的名字；descriptor：对象（属性描述符）
//   return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
//     return {
//       value() {
//         return 'not age';
//       },
//       enumerable: bool
//     };
//   };
// }
// class ClassF {
//   constructor(public age: number) {}
//   @enumerable(false)
//   public getAge() {
//     return this.age;
//   }
// }
// const classF = new ClassF(18);
// console.log(classF.getAge()); // not age
// for(const key in classF) { console.log(key); }
// console.log('=========');

// !访问器装饰器
function enumerable1(bool: boolean) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = bool;
  };
}
class ClassG {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  @enumerable1(true) // 只需要在get set上面加一个装饰器就行了
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
const classG = new ClassG('dylann');
// 如果传入false或者不传：只打印_name
// 如果传入true：打印 _name 、 name
for(const key in classG) { console.log(key); }

// !属性装饰器：没法操作属性的属性描述符，它只能用来判断某个类中是否声明了某个名字的属性
function printPropertyName(target: any, propertyName: string) {
  console.log(propertyName + ' ' + 'hahah');
}
class ClassH {
  @printPropertyName
  public name: string;
}

// !参数装饰器：三个参数，参数1：构造函数/原型对象。参数2：成员的名字。参数3：参数在函数的参数列表中的索引
function required(target: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的${index + 1}个参数`);
}
class ClassI {
  public name: string = 'dylan';
  public age: number = 18;
  public getInfo(prefix: string, @required infoType: string): any {
    return prefix + ' ' + this[infoType];
  }
}
interface ClassI {
  [key: string]: string | number | Function;
}
const classI = new ClassI();
console.log(classI.getInfo('heihei', 'age'));




