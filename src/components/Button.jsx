/* eslint-disable react/button-has-type */
import React from 'react';

function Button({ children }) {
  return (
    <button className="block bg-sky-900 hover:bg-sky-500 text-white rounded-2xl btn btn-primary btn-xs">{children}</button>
  );
}

export default Button;
