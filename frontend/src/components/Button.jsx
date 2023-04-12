import React from "react";

const Button = ({ children }) => {
  return (
    <span className="bg-indigo-500 text-gray-200 hover:bg-indigo-600 cursor-pointer hover:text-gray-50 px-2 py-1 rounded">
      {children}
    </span>
  );
};

export default Button;
