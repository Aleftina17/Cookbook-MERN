import React from 'react';

const Loader = ({ message, elapsedTime }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <div className="loader-message">{message}</div>
      <div className="loader-timer">Elapsed time: {Math.floor(elapsedTime)} seconds</div>
    </div>
  );
}

export default Loader;
