import React from "react";
import { useContext } from "react";
import { UserContext } from "../context";

const Component4 = () => {
  const message = useContext(UserContext);
  console.log("message", message);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default Component4;
