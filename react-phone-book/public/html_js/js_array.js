// arr 배열의 각 요소값을 개별 변수에 담아서 사용하고 싶을때
var arr = ["홍길동", "이몽룡", "성춘향", "라푼젤"];
// ES5 이하의 old version
// var hong = arr[0];
// var lee = arr[1];
// var sung = arr[2];
// var rha = arr[3];

const [hong, lee, sung, rha] = arr;
console.log("hong", hong);
console.log("lee", lee);
console.log("sung", sung);
console.log("rha", rha);

const names = { name: "홍기동", phone: "1234", addr: "서울특별시" };
// var name = names.name
// name = names["name"]

const { name, addr, phone } = names;

console.log(name);
console.log(phone);
console.log(addr);

const my = { [name]: "홍길동", 주소: "서울특별시" };
console.log(my.홍기동);
console.log(my.주소);

const arr1 = [1, 2, 3, 4, 5];
const index = 2;
console.log(arr1[index]);

const j1 = "AA";
const j2 = "BB";
const j3 = "CC";

const jclass = {
  [j1]: "홍길동",
  [j2]: "이몽룡",
  [j3]: "성춘향",
  [j4]: "성춘향",
  [j5]: "성춘향"
};

// json 객체 선언
const ajson = { aa: "홍길동", bb: "이몽룡" };
console.log(ajson.aa); // 홍길동
console.log(ajson.bb); // 이몽룡

const aa = ajson.aa;

const { aa, bb } = ajson; // aa라는 변수에 ajson.aa 값만 을 복사
console.log(aa);

var num1 = 30;
var num2 = 40;

var temp = num1;
num1 = num2;
num2 = temp;

[num2, num1] = [num1, num2];

console.log(num1, num2);
