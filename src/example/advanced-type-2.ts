// !返回this实例，可以很好的实现链式调用
class Counter1 {
  constructor(public count: number = 0) {}
  public add(value: number) {
    this.count += value;
    return this;
  }
  public subtract(value: number) {
    this.count -= value;
    return this;
  }
}
let counter1 = new Counter1(10);
console.log(counter1.add(3).add(3));

class PowCounter extends Counter1 {
  constructor(public count: number = 0) {
    super(count);
  }
  public pow(value: number) {
    this.count = this.count ** value;
    return this;
  }
}
const powCounter = new PowCounter(2);
console.log(powCounter.pow(3).subtract(1));

// !索引类型
interface InfoInterfaceAdvanced {
  name: string;
  age: number;
}
let infoProp: keyof InfoInterfaceAdvanced;
infoProp = "age"; // 只能是 name 或 age

function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map(n => obj[n]);
}
const infoObj = {
  name: 'dylann',
  age: 18
};
let values = getValue(infoObj, ["name", "age"]);
console.log(values);

// 索引访问操作符
type NameTypes = InfoInterfaceAdvanced["name"]; // string

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

interface Objs<T> {
  [key: string]: T; // 索引类型为number，值的类型为T
}
let keys: keyof Objs<number>; // keys: string | number ：因为number会被转为字符串

interface Type {
  a: never;
  b: never;
  c: string;
  d: number;
  e: undefined;
  f: null;
  g: object;
}
type Test = Type[keyof Type]; // keyof Type会返回类型不为 never、undefined、null 的属性名

// !映射类型
// TS提供了借助旧类型提供新类型的方式，也就是映射类型，它能够以相同的方式去转换旧类型中的每一个属性
interface Info1 {
  age: number;
  name: string;
  sex: string;
}
// 现在想定义一个新的接口，它里面的参数是只读的
type ReadonlyType<T> = {
  readonly [P in keyof T]: T[P] // 可选属性：[P in keyof T]?: T[P]
};
type ReadonlyInfo1 = ReadonlyType<Info1>;

// ts内置了这两种方法（把所有属性变成只读的、把所有属性变成可选的）
type ReadonlyInfo2 = ReadonlyType<Info1>;
type ReadonlyInfo3 = Partial<Info1>;


