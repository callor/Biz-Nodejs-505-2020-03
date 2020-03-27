import Moment from "react-moment";
import React, { Component } from "react";

class BucketItemView extends Component {
  changeEdit = () => {
    this.props.onEditing();
  };

  handleChangFlag = () => {
    // this.props.changFlag(this.props.bucketItem.b_id);

    const { changFlag, bucketItem } = this.props;
    changFlag(bucketItem.b_id);
  };

  render() {
    const { bucketItem } = this.props;

    return (
      <React.Fragment>
        <td onClick={this.handleChangFlag}>{bucketItem.b_flag_text}</td>
        <td>
          {bucketItem.b_id} :
          <Moment format="YYYY-MM-DD">{bucketItem.b_start_date}</Moment>
        </td>
        <td onClick={this.changeEdit}>{bucketItem.b_title}</td>
        <td>
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
