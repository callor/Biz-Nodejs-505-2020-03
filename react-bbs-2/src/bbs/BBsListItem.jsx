import React, { Component } from "react";

class BBsListItem extends Component {
  // 클래스의 필드변수 선언하는 생성자 부분
  // 여기에 state 로 설정한 변수는
  // 이 클래스내에서 자유롭게 호출하여 사용(읽기, 쓰기)할수 있다.
  state = {
    isEditing: false,
    b_title: ""
  };

  inputClick = ev => {
    ev.stopPropagation();
  };

  toggleEdit = () => {
    // state변수 읽기 1
    // this.state로 부터 원하는 변수를 분해하여
    // 변수 이름만으로 사용하기
    // 여러코드에서 변수를 사용해야 할때
    const { isEditing } = this.state;
    // alert(isEditing);

    // 분해하지 않고 원본그대로 사용하기
    // 한두번만 사용할 것 같을때
    // alert(this.state.isEditing);

    // false -> true, true -> false
    this.setState({ isEditing: !isEditing });
  };

  editInput = ev => {
    // const { b_title } = this.state;
    this.setState({
      ...this.state,
      b_title: ev.target.value
    });
  };

  // rendering이 끝나고 나서 호출되는 메서드
  // preProps, preState 여기에 포함된 값들이
  // rendering 이전의 값을 보유하고 있다
  componentDidUpdate(prevProps, prevState) {
    const { bbs } = this.props;
    if (!prevState.isEditing && this.state.isEditing) {
      // isEditing 값이 false -> true 전환될때
      this.setState({
        b_title: bbs.b_title
      });
    }
  }

  updateHandle = () => {
    const { bbs, bbs_main_url } = this.props;
    const data = { _id: bbs._id, b_title: this.state.b_title };

    fetch(bbs_main_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  };

  deleteHandle = ev => {
    if (window.confirm("데이터를 삭제할까요?")) {
      const { bbs, bbs_main_url } = this.props;
      const data = { _id: bbs._id };
      fetch(bbs_main_url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    }
    // 상위로 이벤트 버블링(전파) 금지
    ev.stopPropagation();
  };

  render() {
    const { bbs } = this.props;
    return (
      <tr data-id={bbs._id} onClick={this.toggleEdit}>
        <td>{bbs.b_date}</td>
        <td>{bbs.b_time}</td>
        <td>
          {this.state.isEditing ? (
            <div>
              <input
                value={this.state.b_title}
                onClick={this.inputClick}
                onChange={this.editInput}
              />
              <button type="button" onClick={this.updateHandle}>
                완료
              </button>
            </div>
          ) : (
            <span>{bbs.b_title}</span>
          )}
        </td>
        <td>
          <button type="button" onClick={this.deleteHandle}>
            삭제
          </button>
        </td>
      </tr>
    );
  }
}

export default BBsListItem;
