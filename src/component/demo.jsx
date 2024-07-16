import React from "react";
import { useRef, useEffect } from "react";

const Demo = ({ name, message }) => {
  const elementRef = useRef();

  useEffect(() => {
    const divElement = elementRef.current;
    console.log(divElement); // logs <div>I'm an element</div>
  }, []);

  return (
    <div>
      My Name Is {name} <br />
      <label htmlFor="">You ARE {message}</label>
      <div ref={elementRef}>I'm an element</div>
    </div>
  );
};

export default Demo;
