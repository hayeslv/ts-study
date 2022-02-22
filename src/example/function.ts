// !函数使用方法
// function add(a: number, b: number): number {
//   return a + b;
// }
// const add = (a: number, b: number): number => a + b;

// !定义函数类型
let add1: (x: number, y: number) => number;
add1 = (a: number, b: number): number => a + b;
// add1 = (a: string, b: number) => a + b; // Error

// !函数中如果使用了函数体之外的变量，这个变量的类型是不提现在函数类型定义中的
let arg3 = 3;
add1 = (a: number, b: number): number => a + b + arg3;

// !使用接口（或类型别名）定义函数类型
interface Add {
  // tslint:disable-next-line: callable-types
  (x: number, y: number): number;
}
// 上面代码会被ts-lint转换为: type Add = (x: number, y: number) => number
type isString = string;
let addFunc: Add;
addFunc = (a: number, b: number): number => a + b;

// !函数的参数
let addFunc1;
addFunc1 = (arg1: number, arg2: number) => arg1 + arg2;
addFunc1 = (a, b, c) => a + b + (c ? c : 0);
// 可选参数
type AddFunction = (a: number, b: number, c?: number) => number;
let addFunction: AddFunction;
addFunction = (x: number, y: number) => x + y;
addFunction = (x: number, y: number, z: number) => x + y + z;

// 默认参数
const addFunc2 = (x: number, y = 3) => x + y;
// addFunc2(2, 'a'); // Error：TS已经推断出来y是number类型了

// 获取剩余函数参数
const handleData = (a: number, ...args: number[]) => {
  // ...
};

// !函数重载
function handleData1(x: string): string[];
function handleData1(x: number): number[];
function handleData1(x: any): any {
  if(typeof x === 'string') {
    return x.split('');
  } else {
    return x.toString().split('').map(item => Number(item));
  }
}
handleData1('abc');
// handleData1('abc').map(item => item.toFixed()); // Error：属性“toFixed”在类型“string”上不存在。
handleData1(123);



