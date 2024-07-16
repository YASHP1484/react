import React from "react";
const Child = ({ messages, updateMessage }) => {
  return (
    <div>
      <h1>{messages}</h1>
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
};

export default Child;
