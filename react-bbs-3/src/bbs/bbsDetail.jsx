import React, { Component } from "react";
import "../App.css";

class bbsDetail extends Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  state = {
    bbsVO: {},
  };

  // 서버에게 bbsid값을 전달하고
  // bbs detail 정보를 가져와서
  // 나에게 보여달라
  bbsDetailFetch = () => {
    const bbsid = this.props.match.params.bbsid;
    fetch("http://localhost:8080/bbs/api/detail?bbsid=" + bbsid)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          bbsDate: result.bbsDate,
          bbsAuth: result.bbsAuth,
          bbsTitle: result.bbsTitle,
          bbsText: result.bbsText,

          bbsVO: result,
        });
      });
  };

  componentDidMount() {
    this.bbsDetailFetch();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const bbsid = this.props.match.params.bbsid;
    const { bbsVO } = this.state;
    const { bbsDate, bbsAuth, bbsTitle, bbsText } = this.state.bbsVO;
    return (
      <div>
        <h3>나는 {bbsid} 입니다</h3>
        <p>작성일자 : {bbsVO.bbsDate}</p>
        <p>작성자 : {bbsAuth}</p>
        <p>제목 : {this.state.bbsTitle}</p>
        <p>내용 : {this.state.bbsText}</p>
        <p
          style={{ cursor: "pointer" }}
          onClick={(e) => this.props.history.push("/")}
        >
          목록으로 돌아가기
        </p>
      </div>
    );
  }
}
export default bbsDetail;
