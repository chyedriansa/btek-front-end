/* eslint-disable react/button-has-type */
import React from 'react';

function Button({ children }) {
  return (
    <button className="block bg-black text-white rounded-xl">{children}</button>
  );
}

export default Button;
