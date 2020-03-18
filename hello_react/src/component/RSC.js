import React from "react";
import RCC_SUB from "./RSC_SUB";

/*
함수형 콤포넌트 생성
const RSC = function() {}
함수형 콤포넌트는 2014버전에서 부터 사용가능
App.js > RCC.jsx, (RSC.js > RCC_SUB.jsx)

RCC_SUB 콤포넌트에서 name 변수에 값을 담아서 전달하기
<COM 변수="값"/>
*/
const RSC = () => {
  return (
    <div>
      <div>나는 두번째 함수형 콤포넌트 입니다.</div>
      <RCC_SUB name="홍길동" />
    </div>
  );
};

export default RSC;
