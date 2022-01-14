// !交叉类型
const mergeFunc = <T, U>(arg1: T, arr2: U): T & U => {
  let res = {} as T & U;
  res = Object.assign(arg1, arr2);
  return res;
};
mergeFunc({ a: 'a' }, { b: 'b' });

// !联合类型
// type1 | type2 | type3

// !类型保护
const valueList = [123, 'abc'];
const getRandomValue = () => {
  const number = Math.random() * 10;
  if(number < 5) return valueList[0];
  return valueList[1];
};
const item = getRandomValue();

// 方法1
if((item as string).length) {
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}

// 方法2（用于复杂类型判断）
function isString(value: number | string): value is string {
  return typeof value === 'string';
}
if(isString(item)) {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// 方法3（用于简单类型判断）
// typeof 要比较的类型，必须是这几种中的一种：string/number/boolean/symbol
if(typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}

// !instanceof类型保护
class CreatedByClass1 {
  public age = 18;
  constructor() {}
}
class CreatedByClass2 {
  public name = 'dylan';
  constructor() {}
}
function getRandomItem() {
  return Math.random() < 0.5 ? new CreatedByClass1() : new CreatedByClass2();
}
const item1 = getRandomItem();
if(item1 instanceof CreatedByClass1) {
  console.log(item1.age);
} else {
  console.log(item1.name);
}

// ! null/undefined
// 打开tslint的：strictNullChecks
const sumFunc = (x: number, y?: number) => x + (y || 0); // 这里y会发现它是一个 number | undefined 联合类型

// !类型保护和类型断言
const getLengthFunction = (value: string | null): number => {
  // if(value === null) return 0;
  // return value.length;
  // 或者
  return (value || '').length;
};

function getSplicedStr(num: number | null): string {
  function getRes(prefix: string) {
    // 因为有函数嵌套，所以这里需要使用 ! 进行类型断言
    return prefix + num!.toFixed().toString();
  }
  num = num || 0.1;
  return getRes('dylan-');
}

// !类型别名
type TypeString = string;
let string: TypeString;
// 使用类型别名时，属性可以是自己
type Childs<T> = {
  current: T,
  child?: Childs<T>, // 树状结构
};

// !字面量类型
type Name = 'Dylan';
// const name2: Name = 'Dylan1'; // 不能将类型“"Dylan1"”分配给类型“"Dylan"”。ts(2322)
type Direction = 'north' | 'east' | 'south' | 'west';
function getDirection(direction: Direction) {
  return direction;
}
getDirection("east"); // 这里传入参数就会有提示，只能选这四个

// !可辨识联合：
// 1、具有普通的单例类型属性
// 2、一个类型别名包含了哪些类型的联合
interface Square {
  kind: 'square';
  size: number;
}
interface Rectangle {
  kind: 'reactangle';
  height: number;
  width: number;
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type Shape = Square | Rectangle | Circle;
function assertNever(value: never): never {
  throw new Error('Unexpected object: ' + value);
}
function getArea(s: Shape): number {
  switch(s.kind) {
    case "square": return s.size * s.size;
    case "reactangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
    default: return assertNever(s); // !完整性检查
  }
}







