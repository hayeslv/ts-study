let name1 = 'dylan';
// name1 = 123; // Error（类型推论）：不能将类型“number”分配给类型“string”。

let arr6 = [1, 'a']; // ts会推断数组类型是 (string | number)[]
// arr6 = [1, 2, 3, 'a', true]; // Error：不能将类型“boolean”分配给类型“string | number”。


// !类型兼容性
interface InfoInterface {
  name: string;
}
let infos: InfoInterface;
const infos1 = { name: 'dylan' };
const infos2 = { age: 18 };
const infos3 = { name: 'dylan', age: 18 };
infos = infos1;
// infos = infos2; // Error：类型 "{ age: number; }" 中缺少属性 "name"
infos = infos3; // 可以多，不能少

// !参数个数
let x = (a: number) => 0;
let y = (b: number, c: number) => 0;
// y = x;
// x = y; // Error：右边的参数个数，必须要小于等于左边的参数个数

// !参数类型
let x1 = (a: number) => 0;
let y1 = (b: string) => 0;
// x1 = y1; // Error：参数类型不对应

// !可选参数和剩余参数
const getSum = (arr: number[], callback: (...args: number[]) => number): number => {
  return callback(...arr);
};
const result = getSum([1,2,3], (...args: number[]): number => args.reduce((a, b) => a + b, 0));
console.log(result);

// !函数参数双向协变
let funcA = (arg: number | string): void => {};
let funcB = (arg: number): void => {};
// funcA = funcB; // 可以
funcB = funcA; // 也可以

// !返回值类型
let x2 = (): string | number => 0;
let y2 = (): string => 'a';
// x2 = y2; // OK
// y2 = x2; // Error：不能将类型“string | number”分配给类型“string”。

// !函数重载
function merge(arg1: number, arg2: number): number;
function merge(arg1: string, arg2: string): string;
function merge(arg1: any, arg2: any) {
  return arg1 + arg2;
}

// !枚举的兼容性
enum StatusInterface {
  On,
  Off,
}
let s = StatusInterface.On;
s = 2; // OK：它是和数值类型兼容的
enum Animal {
  Dog,
  Cat
}
// s = Animal.Dog

// !类的兼容性：只比较实例的成员。类的静态成员和构造函数不进行比较
class AnimalClass {
  public static age: number;
  constructor(public name: string) {}
}
class PeopleClass {
  public static age: string;
  constructor(public name: string) {}
}
class FoodIsClass {
  constructor(public name: number) {}
}
let animal: AnimalClass;
let people: PeopleClass;
let food: FoodIsClass;
animal = people; // OK
// animal = food; // Error：属性“name”的类型不兼容。

// !如果被赋值的类包含私有成员，那么赋值方必须有来自同一个类的私有成员
class ParentClass {
  private age: number;
  constructor() {}
}
class ChildrenClass extends ParentClass {
  constructor() {
    super();
  }
}
class OtherClass {
  private age: number;
  constructor() {}
}
const children: ParentClass = new ChildrenClass();
// const other: ParentClass = new OtherClass(); // 不能将类型“OtherClass”分配给类型“ParentClass”。类型具有私有属性“age”的单独声明。

// !泛型的兼容性
// 泛型包含类型参数，这个类型参数可以是任意类型。
// 在使用时，类型参数会被指定为一个特定的类型，这个类型只影响使用了类型参数的部分
interface Data<T> {}
let data1: Data<number>;
let data2: Data<string>;
data1 = data2; // OK：因为函数块内部是空的（没有用到）



