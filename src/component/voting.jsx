import React, { useState } from "react";
import Demo from "./demo";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "../store/Slice/userSlice";

const Voting = () => {
  const [inputAge, setAge] = useState(12);
  const [message, setMessage] = useState("");


  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAge(e.target.value);
    console.log(e.target.value);
  };

  function checkAligibility() {
    dispatch(setUserList({ age: inputAge }));
    let age = parseInt(inputAge);
    age >= 18 ? setMessage("eligible") : setMessage("not eligible");
  }
  return (
    <div>
      {/* <h1>Your age is {userListing.age}</h1> */}
      <input type="text" value={inputAge} onChange={handleChange} />
      <br />
      <button onClick={checkAligibility}>submit</button>
      <Demo message={message} />
    </div>
  );
};

export default Voting;
