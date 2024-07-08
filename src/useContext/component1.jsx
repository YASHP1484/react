import React from "react";
import Component2 from "./component2";
import { UserContext } from "../context";

const Component1 = () => {
  let message = "my name is yash";

  return (
    <UserContext.Provider value={message}>
      <h1>{message}</h1>
      <Component2 />
    </UserContext.Provider>
  );
};
export default Component1;
