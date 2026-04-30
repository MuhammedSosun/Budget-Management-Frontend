import React from "react";

import "./Input.scss";

interface InputProps {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  error?: string;
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}: InputProps) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default Input;
