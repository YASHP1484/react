import React from "react";
import Child from "./child";

const Parent = (props) => {
  const { messages, updateMessage } = props;
  return (
    <div>
      <Child messages={messages} updateMessage={updateMessage} />
    </div>
  );
};

export default Parent;
