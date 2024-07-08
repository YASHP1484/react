import React from "react";
import { useContext } from "react";
import { UserNameContext } from "../context";

const Container = () => {
  const msg = useContext(UserNameContext);
  console.log("loginmsg", msg);

  return <div>{msg && <h1>Login successfull with this user : {msg}</h1>}</div>;
};

export default Container;
