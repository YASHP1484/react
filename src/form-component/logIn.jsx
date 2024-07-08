import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserNameContext } from "../context";
import Container from "./container";
const LogIn = () => {
  const [getInput, setInput] = useState({});
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput((values) => ({ ...values, [name]: value }));
  };

  function onSubmit(event) {
    event.preventDefault();
    axios.get("http://localhost:8000/users").then((res) => {
      const array = res.data;
      let isLogin = false;
      console.log(array, "js");
      for (let index = 0; index < array.length; index++) {
        if (
          array[index].id == getInput.id &&
          array[index].age == getInput.age
        ) {
          // setMsg(array[index].username);
          // navigate("/container");
          setName(array[index].username);
          isLogin = true;
        }
      }
      if (!isLogin) {
        alert("not found");
      }
    });
  }
  return (
    <div>
      <UserNameContext.Provider value={name}>
        <div className="container">
          <form className="col-lg-4">
            <div className="form-group">
              <label htmlFor="">id</label>
              <input
                type="text"
                name="id"
                value={getInput.id}
                className="form-control"
                id="inputName"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                name="age"
                value={getInput.age}
                type="text"
                className="form-control"
                id="inputPassword"
                onChange={handleChange}
              />
            </div>
            <a
              href=""
              className="btn btn-primary submit form-control"
              id="anchorSubmit"
              onClick={onSubmit}
            >
              Log In
            </a>
            <label
              htmlFor=" inputPassword"
              className=" col-form-label labelForForget"
            >
              Forgotten Password?
            </label>
          </form>
        </div>
        <Container />
      </UserNameContext.Provider>
    </div>
  );
};

export default LogIn;
