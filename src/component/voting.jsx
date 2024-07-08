import React, { useState } from 'react';
import Demo from './demo';

const Voting = (  ) => {
  const[inputAge,setAge]=useState(12);
  const[message,setMessage]=useState('');

  const handleChange = (e) => {
    setAge(e.target.value);
    console.log(e.target.value);
  };

  function checkAligibility(){
    let age= parseInt(inputAge);
      age>=18 ? setMessage('eligible'):setMessage('not eligible');   
  } 
  return (
    <div>
      <input type="text" value={inputAge} onChange={handleChange}/><br />
      <button onClick={checkAligibility}>submit</button>
    <Demo message={message}/>
    </div>
  );
}

export default Voting;
