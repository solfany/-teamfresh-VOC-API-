import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/claims">클레임 접수하기 [담당자 전용] </Link>
          </li>
          <li>
            <Link to="/check">클레임 확인하기 [고객사/운송사 전용] </Link>
          </li>
          <li>
            <Link to="/login">로그인 </Link>
          </li>{" "}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
