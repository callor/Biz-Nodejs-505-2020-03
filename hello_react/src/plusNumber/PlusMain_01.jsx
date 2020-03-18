import React from "react";

/*
함수형 콤포넌트
2014이후버전에서 도입되었고, 
React 16.x이후에서 Hooks라는 개념이 탄생을 했다
장점 : 부모로 부터 변수를 전달받을때
함수의 매개변수처럼 받을 수 있다.

함수에서 this 키워드
일반함수에서는 this 키워드가 함수 자체를 표현하는 객체
화살표함수에서는 this 키워드가 
scope 자체가 부모를 가리키는 형태가 되어서
일부 함수내에서 사용할때 주의를 해야 경우가 많다

부모로 부터 변수를 전달받을때
개별적으로 변수를 받을수 도 있고
class에서 props에 담겨서 받는 것과 같은 원리로
받을수 있도록 되었다.
*/
const PlusMain = props => {
  return (
    <div>
      <h1>카운트</h1>
      <h3>{props.name}</h3>
      <button>plus</button>
      <button>Minus</button>
    </div>
  );
};

export default PlusMain;
