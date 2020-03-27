import React, { Component } from "react";
import BucketItemView from "./BucketItemView";
import BucketItemEdit from "./BucketItemEdit";

class BucketItem extends Component {
  state = { isEditing: false };
  handleOnEditing = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { bucketItem } = this.props;

    return (
      <tr onClick={this.handleOnEditing}>
        {this.state.isEditing ? (
          <BucketItemEdit
            bucketItem={bucketItem}
            onEditing={this.handleOnEditing}
          />
        ) : (
          <BucketItemView
            bucketItem={bucketItem}
            onEditing={this.handleOnEditing}
          />
        )}
      </tr>
    );
  }
}

export default BucketItem;
