import React, { useContext } from "react";
import MPro from "../provider/MessageProvider";

const ProFunc = () => {
  const messContext = useContext(MPro);

  return (
    <div>
      <p>나는 함수 컴포넌트</p>
      <p>{messContext.message}</p>
    </div>
  );
};

export default ProFunc;
