// 这种形式丢失了类型检测的功能
const getArray = (value: any, times: number = 5): any[] => {
  return new Array(times).fill(value);
};
getArray(8); // [8, 8, 8, 8, 8]
getArray(8).map(item => item.length); // 数字没有length属性：[undefined, undefined, undefined, undefined, undefined]

// !使用泛型
const getArray1 = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value);
};
// getArray1<number>(8).map(item => item.length); // Error：这样就会提示错误信息 “类型“number”上不存在属性“length”。”

// 参数1是T类型，参数2是U类型，返回类型是元组类型 T,U组成的数组
const getArray2 = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
  return new Array(times).fill([param1, param2]);
};
getArray2(1, 'a', 3); // [[1, 'a], [1, 'a], [1, 'a]]
// 也可以明确泛型调用，不明确的话，TS会自动推导泛型类型：getArray2<number, string>(1, 'a', 3);

// !使用泛型定义函数类型
let getArray3: <T>(arg: T, times: number) => T[];
getArray3 = (arg: any, times: number) => {
  return new Array(times).fill(arg);
};
// 使用类型别名
type GetArray = <T>(arg: T, times: number) => T[];
let getArray4: GetArray = (arg: any, times: number) => {
  return new Array(times).fill(arg);
};
// 使用接口
interface GetArray1 {
  // tslint:disable-next-line: callable-types
  <T>(arg: T, times: number): T[];
}

// !可以将泛型变量定义到最外层
interface GetArray2<T> {
  (arg: T, times: number): T[];
  array: T[];
}


// !泛型约束：使用extends来限制泛型变量
const getArray5 = <T>(arg: T, times): T[] => {
  return new Array(times).fill(arg);
};
getArray5(5, 3);
// 现在想让外面只能传带length属性的：比如数组，字符串，自己定义的对象（里面包含length属性）
interface ValueWithLength {
  length: number;
}
const getArray6 = <T extends ValueWithLength>(arg: T, times): T[] => {
  return new Array(times).fill(arg);
};
// 没有length属性---报错
// getArray6(5, 3); // Error：类型“number”的参数不能赋给类型“ValueWithLength”的参数
getArray6({a: '1', length: 1}, 3);
getArray6('a', 3);
getArray6([1, 2, 3], 3);

// !在泛型约束中使用类型参数
const getProps = (object, propName) => {
  return object[propName];
};
const objs = {
  a: 'a1',
  b: 'b1'
};
getProps(objs, 'a');
getProps(objs, 'c'); // 这里也没有报错，但实际上这里返回的是 undefined

const getProps1 = <T, K extends keyof T>(object: T, propName: K) => {
  return object[propName];
};
getProps1(objs, 'a');
// getProps1(objs, 'c'); // Error：类型“"c"”的参数不能赋给类型“"a" | "b"”的参数。


