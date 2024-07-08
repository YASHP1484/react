import React, { useEffect, useState } from 'react';
import Parent from './parent';

const Grandparent = () => {
  const [messages,setMessage]= useState('Hello from GrandParent');
  const updateMessage=()=>{
    setMessage('new message from Child');
  }

  useEffect(() => {
    console.log("temp", messages);
  }, [messages]);
  
  return (
    <div>
      <Parent messages={messages} updateMessage={updateMessage}/>
      <div>{messages}</div>
      <button onClick={updateMessage}>btn</button>
    </div>
  );
}

export default Grandparent;
