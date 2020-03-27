import Moment from "react-moment";
import React, { Component } from "react";
import BucketContext from "../provider/BucketProvider";

class BucketItemView extends Component {
  static contextType = BucketContext;

  changeEdit = () => {
    this.props.onEditing();
  };

  handleChangFlag = ev => {
    ev.stopPropagation();
    // this.props.changFlag(this.props.bucketItem.b_id);

    /*
    전달받은 changFlag와 bucketItem을 잘 살펴봐야 한다
    bucketItem : 바로 위(BucketItem)에서 전달받은 state 형변수이고
    changeFlag : Main에서 여기까지 전달되어온 handler method 이므로

    분해를 할때 주체가 누구인가를 명확히 구별해야 한다
    bucketItem은 this.props로 부터
    changFlag 는 this.context로 부터 분리를 해야 한다.

    */
    const { bucketItem } = this.props;
    const { changFlag } = this.context;
    changFlag(bucketItem.b_id);
  };

  onComplete = ev => {
    ev.stopPropagation();
    if (window.confirm("꿈을 이루었습니까?")) {
      this.context.bucket_complet(
        this.props.bucketItem.b_id,
        this.props.bucketItem.b_end_date
      );
    }
  };

  render() {
    const { bucketItem } = this.props;
    const td_style = {
      cursor: "pointer"
    };

    return (
      <React.Fragment>
        <td style={td_style} onClick={this.handleChangFlag}>
          {bucketItem.b_flag_text}
        </td>
        <td>
          {bucketItem.b_id} :
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td style={td_style} onClick={this.changeEdit}>
          {bucketItem.b_title}
        </td>
        <td style={td_style} onClick={this.onComplete}>
          {/*
        
        // react에서 조건별로 tag를 표시하고자 할때
        { 검사값 ? ( true 일때) : (false 일때)}
        */}
          {bucketItem.b_end_date !== "" ? (
            <Moment format="YYYY-MM-DD">{bucketItem.b_end_date}</Moment>
          ) : (
            "◎"
          )}
        </td>
        <td>
          <input type="checkbox" value={bucketItem.b_cancel} />
        </td>
      </React.Fragment>
    );
  }
}

export default BucketItemView;
