import React, { Component } from "react";
import BucketContext from "../provider/BucketProvider";

class BucketInsert extends Component {
  // input box를 사용하는 컴포넌트에서
  // 사용자가 입력한 문자열을 임시로 담고 있을 변수 선언
  state = {
    bucket_title: ""
  };

  // 이 컴포넌트에서 상위 컴포넌트에서 제공한
  // Context.Provider를
  // 사용하여 state변수와 handler method들을 사용하겠다
  // 내부에서 this.context 라는 변수가 생성이 된다
  static contextType = BucketContext;

  /*
  현재 컴포넌트에 선언된 state.bucket_title 변수에 사용자의
  입력 문자열을 담는 역할을 수행

  단, 여가에 문자열을 담는다 하여도
  다른 컴포넌트에 문자열이 전파되지는 않는다.
  */
  handleOnChange = event => {
    this.setState({
      // state 변수명을 직접 지정
      bucket_title: event.target.value,

      // input box에 name 속성으로 지정된 문자열을
      // 사용하여 변수명 지정
      // 현재 컴포넌트에 input box가 여러개 있을때
      // 한개의 onChange 이벤트 핸들러만 선언하여
      // 공통으로 사용하기 위한 방법
      [event.target.name]: event.target.value
    });
  };

  /* 
  input box에서 문자열을 입력하는 중 enter 키를 누르면
  BucketMain에서 전달받은 이벤트 핸들러에게 
  state.buckeet_title 변수값을 전달하여
  전체 컴포넌트가 바라보고 있는 배열에 추가하도록 수행하자
  */
  handleOnKeyPress = ev => {
    const { bucket_add } = this.context;
    const { bucket_title } = this.state;

    if (ev.key == "Enter") {
      if (bucket_title === "") {
        alert("버킷을 입력한 후 Enter를 누르세요");
        return false;
      }

      // bucket_add(this.state.bucket_title); // 정형적

      // 비정형적, 비구조적, 분해후 독립변수로 사용
      bucket_add(bucket_title);

      this.setState({
        bucket_title: ""
      });
    }
  };

  render() {
    return (
      <section className="w3-container-fluid">
        <div className="w3-form-control w3-margin">
          {/*
            input box 처리 방법
            1. 컴포넌트 자체에 input box의 value로 지정할 state 변수 선언
            2. value 속성에 state 변수를 지정
            ==> input box는 read only 상태로 변한다.
            3. 사용자의 입력을 받아서 state 변수에 저장할 수 있도록
                onChange 이벤트 핸들러를 만든다.
            */}
          <input
            value={this.state.bucket_title}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyPress}
            name="bucket_title"
            className="w3-input w3-border w3-hover-gray w3-round"
            placeholder="버킷에 추가할 내용을 입력하세요..."
          />
        </div>
      </section>
    );
  }
}

export default BucketInsert;
