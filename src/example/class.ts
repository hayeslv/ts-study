class Point {
  public x: number;
  public y: number;
  constructor (x: number, y: number){
    this.x = x;
    this.y = y;
  }
  public getPosition () {
    return `(${this.x}, ${this.y})`;
  }
}
const point = new Point(1, 2);
console.log(point);

// !继承
class Parent {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name: string) {
    super(name);
  }
}

// public 修饰符表示公共的
// private 私有的：在类的外面不能访问，该类被继承也不能访问private属性和方法
// protected 受保护：可以被自己和子类调用；子类调用时，只允许使用方法
// protected可以修饰constructor，此时不能用当前class生成实例，只能被继承

// !readonly
class UserInfo {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const userInfo = new UserInfo('dylan');
console.log(userInfo.name);
// userInfo.name = 'haha'; // Error：无法分配到 "name" ，因为它是只读属性。

// !参数属性
class A {
  // 这里同时会帮你把name放到实例上（因为使用了 public 修饰符）
  constructor(public name: string) {}
}
const a1 = new A('dylan');
console.log(a1);

// !静态属性
class Parent1 {
  public static age: number = 18;
  public static getAge() {
    return Parent1.age;
  }
  constructor() {}
}
const p1 = new Parent1();
// console.log(p1.age); // Error：拿不到
console.log(Parent1.age); // 18：因为age是类的静态属性，只有类本身可以拿到

// !抽象类：一般用于被其他类继承，而不用于直接创建实例
// 抽象方法和抽象存取器，都不能有实际的代码块
abstract class People {
  public abstract _name: string;
  abstract get insideName(): string;
  abstract set insideName(value: string)
  constructor(public name: string) {}
  public abstract printName(): void;
}
class Man extends People {
  public _name: string;
  public insideName: string;
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  // 需要在具体类中实现抽象类的抽象方法
  public printName() {
    console.log(this.name);
  }
}

// !类类型的接口
// 使用接口可以强制一个类必须包含某些内容
interface FoodInterFace {
  type: string;
}
// 接口检测的是使用该接口定义的类创建的实例
class FoodClass implements FoodInterFace {
  public type: string; // 这里必须要有type，而且必须是 string 类型
}

// !接口继承类
// 接口继承类后，会继承这个类的成员和成员类型（包含private、protected），但是不包括其实现
class A1 {
  protected name: string;
}
interface I extends A1 {}
class B1 extends A1 implements I {
  public name: string;
}

// !在泛型中使用类
// 这里表示：传入的是一个类，返回的是类创建的实例；new() 表示调用这个类的构造函数
const create = <T>(c: new() => T): T => {
  return new c();
};
class Infos {
  public age: number;
}
create(Infos);
