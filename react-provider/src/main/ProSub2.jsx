import React, { Component } from "react";
import ProInsert from "./ProInsert";

class ProSub2 extends Component {
  render() {
    const { message, changeMessage } = this.props;
    return (
      <div>
        <h3>나는 Sub2 입니다</h3>
        <p>Sub 2 : {message}</p>
        <p>나는 {message}를 ProInsert에게 전달합니다</p>
        <ProInsert message={message} changeMessage={changeMessage} />
      </div>
    );
  }
}

export default ProSub2;
