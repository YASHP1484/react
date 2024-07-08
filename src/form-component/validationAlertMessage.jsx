import React from "react";
const ValidationAlertMessage = ({ message }) => {
  return (
    <>
      {message && (
        <div>
          <h6 className="alert-class"> {message}</h6>
        </div>
      )}
    </>
  );
};

export default ValidationAlertMessage;
