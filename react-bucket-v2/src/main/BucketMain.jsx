import React, { Component } from "react";
import BucketInsert from "./BucketInsert";
import BucketList from "./BucketList";
import BucketContext from "../provider/BucketProvider";

class BucketMain extends Component {
  id = 0;
  state = {
    bucketList: [
      {
        b_id: 0,
        b_flag: 0,
        b_flag_text: "☆",
        b_start_date: "2020-03-26",
        b_title: "리액트 정복",
        b_end_date: "",
        b_end_check: false,
        b_cancel: false
      }
    ],
    changFlag: id => this.changFlag(id),
    bucket_update: (id, b_title) => this.bucket_update(id, b_title),
    bucket_add: b_title => this.bucket_add(b_title),
    bucket_complet: (id, b_end_date) => this.bucket_complet(id, b_end_date),
    toggleCancel: id => this.toggleCancel(id)
  };

  // 17 이후는 사용불가
  // componentWillMount
  // 매우 불안정하고 무한루프에 빠지가 쉽데

  // 현재 컴포넌트가 모두 연결되고 화면에 나타난 직후
  // rendering 바로 직전
  componentDidMount() {
    const strBucketList = localStorage.bucketList;
    // 문자열, 객체일경우 if 조건에서 없으면 false, 있으면 true
    if (strBucketList) {
      const jsonBucketList = JSON.parse(strBucketList);
      this.setState({
        bucketList: jsonBucketList
      });
      this.id = jsonBucketList.length;
    }
  }

  // 화면이 rendering이 끝나고
  // 데이터 변경되어 다시 렌더링이 되려고 할때
  componentDidUpdate(preProps, preState) {
    // 객체를 통째로 문자열로 변경
    const preString = JSON.stringify(preState.bucketList);
    const thisString = JSON.stringify(this.state.bucketList);

    // web브라우저 내장 DB에 문자열 저장 이때 key : bucketList
    if (preString !== thisString) {
      localStorage.bucketList = thisString;
    }
  }

  changFlag = id => {
    // const b_flage = ["☆", "★", "○", "●"];
    const b_flage = ["대충", "일반", "중요", "매우중요"];
    this.setState({
      bucketList: this.state.bucketList.map(bucket => {
        if (bucket.b_id === id) {
          let flag = ++bucket.b_flag % 4;
          let flagText = b_flage[flag];
          return {
            ...bucket,
            b_flag_text: flagText,
            b_flag: flag
          };
        } else {
          return bucket;
        }
      })
    });
  };
  /* 
  bucketList에 항목을 추가하여 전체 컴포넌트에 전파될수 있도록
  메서드를 선언

  react 선언적 철학1
  기존의 객체(배열)은 원본을 손상시키지 말자
  => 아래와 같은 기능을 구현하지 마라
    객체 배열에 새로운 항목울 추가 : push()
    객체 배열에서 항목을 제거 : remove()
    객체 배열의 요소중에 어떤 항목변경 할때 : 객체[0] = 새로운 값
  => 그러면 어떻게??
  새로운객체를 만들고
    추가 : 기존객체 + 추가된 항목 생성하여 새로운 객체에 복사
    변경 : 기존객체 변경내용만 변경하여 새로운 객체에 복사

  */
  bucket_add = b_title => {
    const { bucketList } = this.state;

    const date = new Date();

    //  b_id 값은 버켓 리스트의 PK 값을 갖는 칼럼으로
    // state에 지정된 id 값을 1 증가시키므로서 생성을 하고
    // 리스트의 b_id 칼럼에 값을 저장
    const bucket = {
      b_id: ++this.id,
      b_flag: 0,
      b_flag_text: "※",
      b_start_date: date.toString(),
      b_title: b_title,
      b_end_date: "",
      b_end_check: false,
      b_cancel: false
    };

    this.setState({
      // id가 ++this.id
      // 나머지 요소가 bucket에서 정의한 형태의 객체(vo)를 생성하여
      // 원본의 bucketList에 추가하여
      // 새로운 bucketList를 생성하라
      bucketList: bucketList.concat({ ...bucket })
    });
  };

  bucket_update = (id, b_title) => {
    const { bucketList } = this.state;
    console.log("Main update", id, b_title);
    this.setState({
      // bucketList를 map 으로 반복 실행하면서
      // 각요소의 id값과 매개변수로 받은 id값이 일치하면
      // b_title만 새로운 값으로 변경하여 리턴하라
      bucketList: bucketList.map(bucket =>
        bucket.b_id === id ? { ...bucket, b_title: b_title } : bucket
      )
    });
  };

  // 완료선택이 이루어 지면 bucketList를 map으로 반복하면서
  // id 값과 일치하는 항목을 찾고
  // 있으면 해당 항목을 변경하는 작업 수행
  bucket_complet = (id, b_end_date) => {
    // alert(id + ":완료:" + b_end_date);
    const { bucketList } = this.state;

    this.setState({
      bucketList: bucketList.map(bucket => {
        // id 값과 일치하는 리스트가 있느나?
        if (bucket.b_id === id) {
          const date = new Date();
          // 현재 항목의 b_end_date 값이 없느냐?
          // 없으면 새로만든 date 값을 사용하고
          // 있으면 값을 지우는 "" 으로 사용하겠다
          const end_date = bucket.b_end_date === "" ? date : "";
          return { ...bucket, b_end_date: end_date };
        } else {
          return bucket;
        }
      })
    });
  };

  toggleCancel = id => {
    const { bucketList } = this.state;
    this.setState({
      bucketList: bucketList.map(bucket => {
        if (bucket.b_id === id) {
          // bucket.b_cancel 값을 true -> false, false -> trhe
          return { ...bucket, b_cancel: !bucket.b_cancel };
        } else {
          return bucket;
        }
      })
    });
  };

  // react lifeCycle 메서드
  /*
  만약 현재 Main 컴포넌트에 많은 state 변수들이 있을때
  한개라도 state 변수가 변동되면 rendering이 발생을 할텐데

  그러지 말고
  state 변수중에서 bucketList만 감시하다가
  bucketList가 변경되었을때만 화면을 rendering을 하라 
  */
  shouldComponentUpdate(nextProps, nextState) {
    // return nextState.bucketList !== this.state.bucketList;
    return true;
  }

  render() {
    return (
      <div>
        <BucketContext.Provider value={this.state}>
          <BucketInsert />
          <BucketList />
        </BucketContext.Provider>
      </div>
    );
  }
}

export default BucketMain;
