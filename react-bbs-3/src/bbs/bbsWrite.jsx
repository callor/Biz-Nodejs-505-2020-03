import React from "react";
import axios from "axios";

class bbsWrite extends React.Component {
  state = {
    bbsDate: "",
    bbsAuth: "",
    bbsTitle: "",
    bbsText: "",
  };

  /*
  axios 를 사용하여 서버로 데이터를 전송
  */
  bbsInsert = () => {
    let formData = new FormData();
    formData.append("bbsDate", this.state.bbsDate);
    formData.append("bbsAuth", this.state.bbsAuth);
    formData.append("bbsTitle", this.state.bbsTitle);
    formData.append("bbsText", this.state.bbsText);

    axios
      .post("http://localhost:8080/bbs/api/insert", formData)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label>작성일자</label>
          <input
            onChange={this.handleOnChange}
            value={this.state.bbsDate}
            name="bbsDate"
            type="date"
            className="form-control"
            placeholder="날짜를 입력"
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input
            onChange={this.handleOnChange}
            value={this.state.bbsAuth}
            name="bbsAuth"
            className="form-control"
            placeholder="작성자를 입력"
          />
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            onChange={this.handleOnChange}
            value={this.state.bbsTitle}
            name="bbsTitle"
            className="form-control"
            placeholder="제목을 입력"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={this.handleOnChange}
            name="bbsText"
            value={this.state.bbsText}
            rows="5"
            className="form-control"
          />
        </div>
        <div className="button-group text-right">
          <button
            onClick={this.bbsInsert}
            type="button"
            className="btn btn-primary"
          >
            저장
          </button>
        </div>
      </div>
    );
  }
}

export default bbsWrite;
