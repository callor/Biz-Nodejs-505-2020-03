import React, { Component } from "react";
import axios from "axios";

const BBS_INSERT_URL = "http://localhost:8080/bbs/api/insert";

class BBsWrite extends Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  /*
  react에서는 input 박스에 state 변수를 value 값으로 세팅하면
  ※ 데이터를 외부에서 불러오거나 했을때 자동으로 해당 input 박스에
    값이 세팅되도록 하기 위한 조치
  
  이 기능을 사용하게 되면  
  키보드로 문자열을 입력했을때 문자열이 입력이 안된다.

  각각의 입력박스에 onChange 이벤트를 설정해서
  키보드로 입력한 문자열을 state 변수에 세팅해주는 절차가 필요하다

  문제는
  input box가 1,2개 정도이면 각각의 input box에 event 핸들러를 
  부착하여 작동시키면 되는데
  input box가 많아지면 관리가 힘들고 
  input box의 추가나 변경이 발생하면 유지보수가 매우 어려워 진다.

  그래서 여러개의 input box가 있을 경우는
  1개의 event 핸들러를 작성하고
  공통으로 활용하는 방법이 주로 상된다.

  */
  handleChangebbsDate = (e) => {
    this.setState({
      bbsDate: e.target.value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  bbsInsert = () => {
    let formData = new FormData();
    formData.append("bbsDate", this.state.bbsDate);
    formData.append("bbsAuth", this.state.bbsAuth);
    formData.append("bbsTitle", this.state.bbsTitle);
    formData.append("bbsText", this.state.bbsText);

    axios
      .post(BBS_INSERT_URL, formData)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <form>
        <div className="form-group">
          <label>작성일자</label>
          <input
            className="form-control"
            name="bbsDate"
            onChange={this.handleChange}
            value={this.state.bbsDate}
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input
            className="form-control"
            name="bbsAuth"
            onChange={this.handleChange}
            value={this.state.bbsAuth}
          />
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            className="form-control"
            name="bbsTitle"
            onChange={this.handleChange}
            value={this.state.bbsTitle}
          />
        </div>
        <div>
          <textarea
            className="form-control"
            rows="5"
            name="bbsText"
            onChange={this.handleChange}
            value={this.state.bbsText}
          />
        </div>
        <div className="text-right">
          <button
            type="button"
            onClick={this.bbsInsert}
            className="btn btn-primary"
          >
            게시글 등록
          </button>
        </div>
        <p />
        <p />
        <p />
      </form>
    );
  }
}

export default BBsWrite;
