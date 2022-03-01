// !同名接口会合并
interface InfoInter {
  name: string;
  getRes(input: string): number;
}
interface InfoInter {
  age: number;
  getRes(input: number): string;
}
let infoInter: InfoInter = {
  name: 'dylan',
  age: 18,
  getRes(text: any): any {
    if(typeof text === 'string') { return text.length; }
    else { return String(text); }
  }
};

// !命名空间合并
namespace Validations {
  export const numberReg = /^[0-9]+$/;
  export const checkNumber = () => {};
}
namespace Validations {
  console.log(numberReg); // 这里可以访问到，因为他俩已经进行合并了
  export const checkLetter = () => {};
}
// 相当于
// namespace Validations {
//   export const checkNumber = () => {};
//   export const checkLetter = () => {};
// }

// !命名空间和类合并：类一定要在前面
class Validations1 {
  constructor() {}
  public checkType() {}
}
namespace Validations1 {
  export const numberReg = /^[0-9]+$/;
}
console.dir(Validations1); // class方法，里面静态属性有一个 numberReg

// !命名空间和函数合并：函数一定要在前面
function countUp11() {
  countUp11.count++;
}
namespace countUp11 {
  export let count = 0;
}
console.log(countUp11.count); // 0
countUp11();
console.log(countUp11.count); // 1

// !命名空间合枚举的合并
enum Colors {
  red,
  green,
  blue
}
namespace Colors {
  export const yellow = 3;
}
// 注意：没有 3: 'yellow'
console.log(Colors); // {0: 'red', 1: 'green', 2: 'blue', red: 0, green: 1, blue: 2, yellow: 3}























