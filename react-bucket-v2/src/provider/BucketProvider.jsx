import React, { createContext } from "react";

/*
obsover 로서 state변수와 여러가지 handler method를 통합관리하고
상위(Main) 컴포넌트에서 하위(View, List, Insert) 컴포넌트에
state 변수를 전달하고
하위 컴포넌트에서 Main의 state 변수를 변경하여
여러 컴포넌트에 state 변수를 전파할때 사용할
handler method를 배포하는 역할을 수행
*/
const BucketProvider = createContext({
  // 여러 컴포넌트에 전파할때 사용할 state 변수
  bucketList: [],

  // 하위 컴포넌트에서 전달받아 사용할 handler method
  changFlag: id => {},
  bucket_add: b_title => {},
  bucket_update: (id, b_title) => {},
  bucket_complet: (id, b_end_date) => {},
  toggleCancel: id => {}
});

export default BucketProvider;
