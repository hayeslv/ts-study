// ! 布尔类型
let bool: boolean;
bool = false;

// ! 数值类型
let num: number = 123;
num = 0b1011; // 二进制
num = 0o171; // 八进制
num = 0x7b; // 十六进制

// ! 字符串类型
let str: string;
str = 'bac';
str = `数值是${num}`;

// ! 数组类型
let arr1: number[];
arr1 = [1, 2, 3];

let arr2: number[];
arr2 = [1, 2, 3];

let arr3: (string | number)[];
arr3 = [1, '2', 3];

// ! 元组类型
let tuple: [string, number, boolean];
tuple = ['a', 1, false]; // 必须按照上面的顺序和类型

// ! 枚举类型
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
console.log(Roles.SUPER_ADMIN); // 0
console.log(Roles[Roles.SUPER_ADMIN]); // SUPER_ADMIN

// ! any类型
let value: any;
value = 'abc';
value = 2;
value = [1,2,3];
let arr4: any[] = [1, 'a'];

// ! void类型
const consoleText = (text: string): void => { // 不返回内容
  console.log(text);
};
let v: void;
v = undefined;
v = null; // tsconfig的strict需要关掉

// ! null 和 undefined
let u: undefined;
u = undefined;
let n: null;
n = null;
// null 和 undefined 是其他类型的子类型
num = undefined;
num = null;

// ! never类型：抛错or死循环，返回值就是 never 类型。
// never类型是任意类型的子类型，没有任何类型是never的子类型 =》 never可以赋值给任意类型，任意类型都不能赋值给never类型 =》 它可以给别人，但别人不能给它
const errorFunc = (message: string): never => {
  throw new Error(message);
};
const infiniteFunc = (): never => {
  while(true) {}
};

// ! object
function getObject(obj: Object): void {
  console.log(obj);
}
getObject({ name: 'dylan' });

// ! 类型断言
const getLength = (target: string | number): number => {
  if((target as string).length || (target as string).length === 0) {
    return (target as string).length;
  } else {
    return target.toString().length;
  }
};



