import React, { Component } from "react";
import { database } from "../config/firebaseConfig";
import moment from "moment";
import "moment-timezone";

class BBsWrite extends Component {
  state = {
    seq: "",
    b_write: "",
    b_title: "",
    b_text: "",
  };

  bbsUpdate = () => {
    console.log("update");
  };

  bbsInsert = () => {
    /*
    seq값이 있으면 update, 없으면 새로운 키 작성하고 insert
    */
    var newKey = this.state.seq;
    console.log("seq", newKey);
    if (!newKey) {
      newKey = database.ref().child("bbs").push().key;
    }
    console.log("new", newKey);

    /*
    원격 서버에 deploy를 하면
    시간대 문제로 날짜와 시간에 문제가 발생할 수 있다
    이때 moment().tz("Asia/Seoul").format() 을 추가하면
    대한민국 표준시로 날짜, 시간을 설정할 수 있다.
    */
    database
      .ref("bbs/" + newKey)
      .set({
        seq: newKey,
        b_date: moment().tz("Asia/Seoul").format("YYYY-MM-DD"),
        b_time: moment().tz("Asia/Seoul").format("HH:mm:ss"),
        b_title: this.state.b_title,
        b_write: this.state.b_write,
        b_text: this.state.b_text,
      })
      .then(() => {
        // 데이터 저장이 완료되면 처음 화면으로 점프하기
        // react-router로 감싸진 경우 this.props.history 객체를 통해 원한는 path로 redirect할수 있다.
        this.props.history.push("/");
      });
  };

  /*
  화면이 rendering 될때 seq키를 조회하여 데이터 가져오기
  */
  componentDidMount() {
    this.bbsItemFetch();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  bbsItemFetch = () => {
    // 만약 ...bbsid 값이 undefined이면 0을 id에 저장하고
    // 그렇지 않으면 그 문자열을 id에 저장하라
    const seq = this.props.match.params.seq;
    if (!seq) return;
    database
      .ref("bbs/" + seq)
      .once("value")
      .then((result) => {
        console.log(result);
        let bbsVO = result.val();
        this.setState({
          seq: bbsVO.seq,
          b_title: bbsVO.b_title,
          b_write: bbsVO.b_write,
          b_text: bbsVO.b_text,
        });
      });
  };

  // input box에 데이터를 입력할수 있도록 even설정
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container-fluid p-5">
        <div className="form-group">
          <input
            class="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_write}
            name="b_write"
            placeholder="작성자"
          />
        </div>
        <div className="form-group">
          <input
            class="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_title}
            name="b_title"
            placeholder="제목"
          />
        </div>
        <div className="form-group">
          <input
            class="form-control"
            onChange={this.handleOnChange}
            value={this.state.b_text}
            name="b_text"
            placeholder="내용"
          />
        </div>
        <div className="button-group text-right">
          <button
            type="button"
            onClick={this.bbsInsert}
            className="btn btn-primary"
          >
            저장
          </button>
        </div>
      </div>
    );
  }
}

export default BBsWrite;
