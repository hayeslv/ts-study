// const getFullName = ({ firstName, lastName }) => {
//   return `${firstName} ${lastName}`;
// };

interface NameInfo {
  firstName: string;
  lastName: string;
}
const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`;
};
getFullName({
  firstName: 'haha',
  lastName: 'Lv'
});

// !可选属性
interface Vegetable {
  color?: string;
  type: string;
}
const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? (color + ' ') : ''}${type}`;
};
getVegetables({ type: 'tomato' });
// 如果多传入参数会报错，这时可以使用类型断言；或者在Vegetable中添加 [prop: string]: any
getVegetables({ type: 'tomato', size: 2 } as Vegetable);
// 或者利用类型兼容性
const vegetableInfo = {
  type: 'tomato',
  size: 2
};
getVegetables(vegetableInfo);


// !只读属性
interface Vegetable1 {
  color?: string;
  readonly type: string;
}
let vegetableObj: Vegetable1 = {
  type: 'tomato'
};
vegetableObj.type = 'carrot'; // Error

// 我们还可以限定一个数组的元素只能读取，不能修改
interface ArrInter {
  0: number;
  readonly 1: string;
}
let arr5: ArrInter = [1, 'a'];
arr5[1] = 'b'; // Error


// !定义函数结构
type AddFunc = (num1: number, num2: number) => number;
const add: AddFunc = (n1, n2) => n1 + n2;

// !索引类型
interface RoleDic {
  [id: number]: string;
}
const role1: RoleDic = {
  'a': 'super_admin' // Error
};

interface RoleDic1 {
  [id: string]: string;
}
const role2: RoleDic1 = {
  a: 'super_admin',
  1: 'admin' // 这里会把 1 自动转换成字符串
};


// !接口的继承
interface Vegetables {
  color: string;
}
interface Tomato extends Vegetables {
  radius: number;
}
interface Carrot {
  length: number;
}
const tomato: Tomato = {
  radius: 1,
  color: 'red'
};
const carrot: Carrot = {
  length: 1
};

// !混合类型接口
// 1、闭包
const countUp = (() => {
  let count = 0;
  return () => {
    return ++count;
  };
})();
// 2、给函数添加属性
const countUp1 = () => {
  countUp1.count++;
};
countUp1.count = 0;
countUp1();
console.log(countUp1.count);

// 给函数添加属性---使用ts
interface Counter {
  (): void;
  count: number;
}
const getCounter = (): Counter => {
  const c = () => c.count++;
  c.count = 0;
  return c;
};
const counter: Counter = getCounter();
counter();
counter();
console.log(counter.count);

