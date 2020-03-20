import React, { Component } from "react";

class PhoneInsert extends Component {
  render() {
    return (
      <form>
        <input placeholder="이름을 입력.." />
        <input placeholder="전화번호.." />
        <button>저장</button>
      </form>
    );
  }
}

export default PhoneInsert;
