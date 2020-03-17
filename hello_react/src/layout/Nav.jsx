import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="main-menu">
      <ul>
        <li>
          <a href="#">홈</a>
        </li>
        <li>
          <a href="#">도서보기</a>
        </li>
        <li>
          <a href="#">독서록보기</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
