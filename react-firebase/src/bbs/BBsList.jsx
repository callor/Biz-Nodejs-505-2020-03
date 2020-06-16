import React, { Component } from "react";
import { database } from "../config/firebaseConfig";
import BBsItem from "./BBsItem";

class BBsList extends Component {
  state = {
    bbsList: [],
  };

  // db 읽어와서 List에 뿌려줄 LifeCyle method
  componentDidMount() {
    database
      .ref("bbs")
      .once("value")
      .then((result) => {
        result.forEach((item) => {
          this.setState({
            bbsList: this.state.bbsList.concat(item.val()),
          });
        });
      });
    console.log(this.state.bbsList);
    // this.setState({ bbsList: [...resultList] });
  }

  render() {
    const bbsMap = this.state.bbsList.map((bbsVO) => {
      return <BBsItem bbsVO={bbsVO} key={bbsVO.seq} />;
    });

    return (
      <>
        <table className="table table-all table-striped table-hover">
          <thead>
            <tr>
              <th>작성일자</th>
              <th>작성시각</th>
              <th>작성자</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>{bbsMap}</tbody>
        </table>
      </>
    );
  }
}

export default BBsList;
