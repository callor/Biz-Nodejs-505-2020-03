console.log("나는 자바스크립트 입니다");

// json type의 객체를 선언
var std = { name: "홍길동", age: 30, tel: "1234" };

// 숫자형 배열을 선언
var arrNumber = [1, 2, 3, 4, 5];

var arrString = ["홍길동", "이몽룡", "성춘향", "장보고"];

// console.log(값, 값, 값) : 각각의 값들을 형변환 하지말고
// 있는 그대로 콘솔에 출력하라
console.log("객체 : ", std);
console.log("숫자형 : ", arrNumber);
console.log("문자열형 :", arrString);

// 객체의 요소중 일부를 변경하고자 할때
// var std = {name : std.name, age:std.age, age:std.tel}
var std = { ...std, age: 100 };
std.age = 100;

console.log("객체 std :", std);
