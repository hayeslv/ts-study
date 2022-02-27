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
type ReadonlyInfo2 = Readonly<Info1>;
type SelectInfo1 = SelectType<Info1>;
type SelectInfo2 = Partial<Info1>;

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
console.log('===========');
console.log(nameAndAddress);

// !Record：将对象中的每一个属性转换为其他值
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  const res: any = {};
  for(const key in obj) {
    res[key] = f(obj[key]);
  }
  return res;
}
const names = { 0: 'hello', 1: 'world', 2: 'bye', 'haha': '123' };
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

// !映射类型
const stringIndex = 'a';
const numberIndex = 1;
const symbolIndex = Symbol();
type Objs2 = {
  [stringIndex]: string,
  [numberIndex]: number,
  [symbolIndex]: symbol
};
type keysType = keyof Objs2; // type keysType = "a" | 1 | typeof symbolIndex
type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P]
};
let objs3: ReadonlyTypes<Objs2> = {
  a: 'aa',
  1: 11,
  [symbolIndex]: Symbol()
};
// objs3[1] = 'b'; // Error：无法分配到 "[numberIndex]" ，因为它是只读属性。

// !元组和数组的映射类型：会生成新的元组和数组类型
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
};
type Tuple = [number, string, boolean];
type promiseTuple = MapToPromise<Tuple>;
let tuple1: promiseTuple = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve('a')),
  new Promise((resolve) => resolve(false)),
];

// !unknown
// 1、任何类型都可以赋值给 unknown 类型
let value1: unknown;
value1 = 'a';
value1 = 1;

// 2、如果没有类型断言或基于控制流的类型细化时，unknown 不可以赋值给其他类型，此时它只能赋值给 unknown 和 any 类型
let value2: unknown;
// let value3: string = value2; // Error：不能将类型“unknown”分配给类型“string”
value1 = value2;

// 3、如果没有类型断言或基于控制流的类型细化，不能在它上面进行任何操作
let value4: unknown;
// value4 += 1; // Error：运算符“+=”不能应用于类型“unknown”和“1”。

// 4、unknown 与任何类型组成的交叉类型，最后都等于其他类型
type type1 = string & unknown;
type type2 = number & unknown;
type type3 = string[] & unknown;
type type4 = unknown & unknown;

// 5、unknown 与任何类型组成的联合类型（除了any），都等于 unknown 类型
type type5 = unknown | string;
type type6 = unknown | any;

// 6、never 类型是 unknown 的子类型
type type7 = never extends unknown ? true : false; // type type7 = true

// 7、keyof unknown 等于类型 never
type type8 = keyof unknown;

// 8、只能对 unknown 进行等或不等操作，不能进行其他操作
(value1 === value2) ? value1 = true : value1 = false;
(value1 !== value2) ? value1 = true : value1 = false;
// value1 += value2; // Error：运算符“+=”不能应用于类型“unknown”和“unknown”。

// 9、unknown 类型的值不能访问它的属性，也不能作为函数调用和作为类创建实例
let value10: unknown;
// value10.age; // Error：对象的类型为 "unknown"。

// 10、使用映射类型时，如果遍历的是 unknown 类型，则不会映射任何属性
type Types1<T> = {
  [P in keyof T]: number
};
type type11 = Types1<any>;
type type12 = Types1<unknown>;

// !条件表达式
// T extends U ? X : Y
type Types2<T> = T extends string ? string : number;
let index1: Types2<'a'>; // string
let index2: Types2<[]>; // number

// !分布式条件类型：当待检测的类型是一个联合类型时，那该条件类型就是一个分布式条件类型，在实例化的时候，TS会自动的分化成联合类型
type TypeName<T> = T extends any ? T : never;
type Types3 = TypeName<string | number>; // type Types3 = string | number

type TypeName1<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends undefined ? undefined :
  T extends () => void ? () => void :
  object;
type Types4 = TypeName1<() => void>; // type Types4 = () => void
type Types5 = TypeName1<string[]>; // type Types5 = object
type Types6 = TypeName1<string[] | (() => void) | string>; // type Types6 = string | object | (() => void)

type Diff<T, U> = T extends U ? never : T;
type Test2 = Diff<string | number | boolean, undefined | number>; // type Test2 = string | boolean
type Test31 = Exclude<string | number | boolean, undefined | number>; // type Test2 = string | boolean

// 返回是function的类型
type Types7<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  undatePart(newName: string): void;
}
type Test1 = Types7<Part>;

// !条件类型的类型推断：infer
type Type8<T> = T extends any[] ? T[number] : T; // T[number]：数组值的访问
type Test3 = Type8<string[]>; // 因为是数组，所以返回其对应值的类型：string

// 使用infer
type Type9<T> = T extends Array<infer U> ? U : T;
type Test5 = Type9<string[]>; // type Test5 = string

// !Exclude<T, U>：从前面类型中选出不在后面类型的
type Type10 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // type Type10 = "c"

// !Extract<T, U>：选取T中可以赋值给U的类型
type Type11 = Extract<'a' | 'b' | 'c', 'b' | 'c'>; // type Type11 = "b" | "c"

// !NonNullable<T>：从T中去掉 null 和 undefined
type Type12 = NonNullable<string | number | null | undefined>; // type Type12 = string | number

// !ReturnType<T>：获取函数类型返回值类型
type Type13 = ReturnType<() => string>; // type Type13 = string

// !InstanceType<T>：获取构造函数的实例类型（T extends 构造函数类型）
class AClass {
  constructor() {}
}
type T1 = InstanceType<typeof AClass>; // type T1 = AClass
type T2 = InstanceType<any>; // type T2 = any
// type T3 = InstanceType<string>; // Error：类型“string”不满足约束“abstract new (...args: any) => any”。

