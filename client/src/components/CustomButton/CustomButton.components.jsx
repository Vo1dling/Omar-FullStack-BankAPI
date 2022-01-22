import React from "react";

const CustomButton = ({ text, children, onClick, userid, edit, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      userid={userid}
      edit={edit}
      className={className}
    >
      {children}
      {text}
    </button>
  );
};
export default CustomButton;
