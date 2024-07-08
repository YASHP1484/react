import React from 'react';
import { useState } from 'react';

const Counter = () => {
  var name = ["Yash", "Meet"];
  const [nameArray, setNamearray] = useState();
  const [getCount, setCount] = useState(0);

  const changeStyleOFName = () => {
    name = name.map((item) => {
      return item.toUpperCase();
    });
    setNamearray(name);
  };
  const counter = () => {
    setCount(getCount + 1);
  };
  const counterMinus = () => {
    if (getCount === 0) {
      alert("minimum  value achieve");
    } else {
      setCount(getCount - 1);
    }
  };
  return (
    <div>
      <div>Hello {name}</div>
      <button className="btn btn-primary" onClick={changeStyleOFName}>
        change
      </button>
      <button className="btn btn-primary" type="" onClick={() => counter()}>
        plus
      </button>
      <label htmlFor="">{getCount}</label>
      <button
        className="btn btn-primary"
        type=""
        onClick={() => counterMinus()}
      >
        minus
      </button>
    </div>
  );
}

export default Counter;
