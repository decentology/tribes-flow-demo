import React from 'react';

const Loader = (props) => {
  return (
    <div className="container">
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>{props.loaderMessage}</h4>
    </div>
  );
}

export { Loader };