import React, { Component } from "react";
// import PropTypes from "prop-types";
import PhoneInsert from "./PhoneInsert";
import PhoneList from "./PhoneList";

class PhoneMain extends Component {
  id = 2;
  state = {
    phoneList: [
      { id: 0, name: "나", phone: "010-9652-8085" },
      { id: 1, name: "홍길동", phone: "010-1111-1234" }
    ]
  };

  //   componentWillMount() {}
  //   componentDidMount() {}
  //   componentWillReceiveProps(nextProps) {}
  //   shouldComponentUpdate(nextProps, nextState) {}
  //   componentWillUpdate(nextProps, nextState) {}
  //   componentDidUpdate(prevProps, prevState) {}
  //   componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <header>
          <h2>MY PHONE BOOK</h2>
        </header>
        <section>
          <PhoneInsert />
          <PhoneList phoneList={this.state.phoneList} />
        </section>
      </React.Fragment>
    );
  }
}

// PhoneMain.propTypes = {};

export default PhoneMain;
