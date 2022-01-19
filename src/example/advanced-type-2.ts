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
type SelectType<T> = {
  [P in keyof T]?: T[P] // 可选属性：[P in keyof T]?: T[P]
};
type ReadonlyInfo1 = ReadonlyType<Info1>;
type SelectInfo1 = SelectType<Info1>;

// ts内置了这两种方法（把所有属性变成只读的、把所有属性变成可选的）
type ReadonlyInfo3 = Partial<Info1>;
type ReadonlyInfo4 = Readonly<Info1>;

// !Pick：原来对象上的一部分属性名，组成的类名
interface Info2 {
  name: string;
  age: number;
  address: string;
}
const info3: Info2 = {
  name: 'dylan',
  age: 18,
  address: '广东'
};
// Pick<T, K>：原来对象上的一部分属性名，组成的类名
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: any = {};
  keys.map(key => {
    res[key] = obj[key];
  });
  return res;
}
const nameAndAddress = pick(info3, ['name', 'address']);

// !Record：将对象中的每一个属性转换为其他值
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const res: any = {};
  for(const key in obj) {
    res[key] = f(obj[key]);
  }
  return res;
}
const names = { 0: 'hello', 1: 'world', 2: 'bye' };
const lengths = mapObject(names, s => s.length);
console.log(lengths);

// !拆包
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
};
function proxify<T>(obj: T): Proxify<T> {
  const result = {} as Proxify<T>;
  for(const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value) => obj[key] = value,
    };
  }
  return result;
}
let props = {
  name: 'dylan',
  age: 18
};
let proxyProps = proxify(props);
console.log(proxyProps); // { name: get set, age: get set }

function unproxify<T>(t: Proxify<T>): T {
  const result = {} as T;
  for(const k in t) {
    result[k] = t[k].get();
  }
  return result;
}
console.log(unproxify(proxyProps)); // {name: 'dylan', age: 18}

// !增加或移除特定修饰符
type RemoveReadonly<T> = {
  -readonly [P in keyof T]-?: T[P]
};
type InfoWithoutReadonly = RemoveReadonly<ReadonlyInfo1>; // 去掉所有的 readonly 和可选
// 51分




