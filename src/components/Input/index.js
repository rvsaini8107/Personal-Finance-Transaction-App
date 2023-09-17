import React from "react";
import "./styles.css";

const Input = ({ label, type, placeholder, state, setState }) => {
  return (
    <div className="input-wrapper">
      <p className="label-input">{label}</p>
      <input
        className="custom-input"
        type={type}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
    </div>
  );
};

export default Input;
