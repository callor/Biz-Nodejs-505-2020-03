import React, { Component } from "react";
import "./bbsDetail.css";

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

  handleDelete = (e) => {
    if (window.confirm("삭제할까요?")) {
      const bbsid = this.props.match.params.bbsid;
      fetch("http://localhost:8080/bbs/api/delete/" + bbsid)
        .then(this.props.history.push("/"))
        .catch((error) => alert(error));
    }
  };

  handleUpdate = (e) => {
    const bbsid = this.props.match.params.bbsid;
    // 누구한테 보낼것인가
    this.props.history.push("/bbsWrite/" + bbsid);
  };

  render() {
    const bbsid = this.props.match.params.bbsid;
    const { bbsVO } = this.state;
    const { bbsDate, bbsAuth, bbsTitle, bbsText } = this.state.bbsVO;
    return (
      <div className="info_wrap">
        <div className="info">
          <span className="info_title">작성일자:</span>
          {bbsDate}
        </div>
        <div className="info">
          <span className="info_title">작성자 : </span>
          {bbsAuth}
        </div>
        <div className="info">
          <span className="info_title">제목 : </span>
          {this.state.bbsTitle}
        </div>
        <div className="info info_text">{bbsText}</div>
        <div
          className="w3-button w3-green w3-margin"
          style={{ cursor: "pointer" }}
          onClick={(e) => this.props.history.push("/")}
        >
          {" "}
          목록으로 돌아가기
        </div>
        <div
          className="w3-button w3-blue  w3-margin"
          style={{ cursor: "pointer" }}
          onClick={this.handleUpdate}
        >
          {" "}
          수정
        </div>
        <div
          className="w3-button w3-red  w3-margin"
          style={{ cursor: "pointer" }}
          onClick={this.handleDelete}
        >
          {" "}
          삭제
        </div>
      </div>
    );
  }
}
export default bbsDetail;
