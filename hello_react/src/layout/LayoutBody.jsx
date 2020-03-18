import React from "react";
import "./LayoutBody.css";

const LayoutBody = () => {
  return (
    <section className="main-body">
      <article className="main-left">
        <p>여기는 본문 왼쪽 부분입니다</p>
      </article>
      <article className="main-right">
        <p>여기는 분문 오른쪽 부분입니다</p>
      </article>
    </section>
  );
};
export default LayoutBody;
