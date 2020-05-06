import React, { Component } from "react";
import BBsList from "./BBsList";

// 서버와 통신을 할때 사용할 여러 설정값을 지정

// 데이터를 서버로부터 요청할때 사용할 URL
const BBS_FETCH_URL = "http://localhost:8080/bbs/api/json";

class BBsMain extends Component {
  timer = "";
  /*
    bbsList 배열을 state로 선언하고
    state로 선언한 변수는 this.setState()라는 method를 
    사용해서 변수 값을 update 수행해야 하고

    state 변수는 자식 component에 전달하여
    rendering 용도로 사용할수 있다.
    */
  state = {
    bbsList: [],
  };

  render() {
    /*
    자식 컴포넌트에게 state 변수를 전달하려면
    변수명 = {this.state} 형식으로 보내고
    자식 컴포넌트에서는 this.props.변수명 형식으로 
    변수를 사용해야한다

    변수명 = {this.state.변수명} 형식으로 보내고
    자식 컴포넌트에서는 this.props.변수형 형식으로
    변수를 사용해야한다.

    코드가 약간 번잡스러워 지기때문에
    부모 컨테이너에서 비구조화 작업을 수행한 후
    변수를 전달해주도록 한다.
    const { 변수명 } = this.state 형식으로
    변수명을 분해(= 비구조화 작업)하여 보내도록 한다.
    */
    const { bbsList } = this.state;
    return (
      <div className="container">
        <BBsList bbsList={bbsList} />
      </div>
    );
  }

  // 서버로 부터 데이터를 가져오는 method
  // componentDidMount()에서 호출 method
  fetchBBsList = () => {
    fetch(BBS_FETCH_URL)
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((result) => {
        this.setState({
          bbsList: result,
        });
      })
      .catch((error) => console.log(error));
  };

  // LifeCycle method에서 현재 화면의 DOM들이
  // 거의 완성이되면 실행되는 method
  componentDidMount() {
    this.fetchBBsList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {}
}

export default BBsMain;

/*
부모 컨테이너와 자식 컨테이너가 데이터를 주고받는 형식

부모 >> 자식 으로 일방통행 방식으로 데이터를 전달 할 수 있다.
부모 >> 자식으로 전달된 변수는 자식입장에서는 모두 props가 된다

※ props 형태의 변수는 절대 변경할수 없는 형태가 되고
  단순히 rendering하는 용도로만 사용해야 한다.

변화가 있는 데이터를 자식이 rendering 하도록 하기 위해서는
부모 컨테이너에서 state 형식의 변수로 만들고
어떤 형태를 통하여 데이터를 변경하면
그 데이터가 자식에게 전파되어 화면에 변화된 모습을 render 한다.  
*/
