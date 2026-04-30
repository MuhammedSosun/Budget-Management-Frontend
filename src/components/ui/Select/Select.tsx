import React from "react";
import "./Select.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  error?: string;
}
function Select({ label, options, value, onChange, error }: SelectProps) {
  return (
    <div className="select-group">
      <label className="select-group__label">{label}</label>
      <select
        className={`select-group__input ${error ? "select-group__input--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-group__error-text">{error}</span>}
    </div>
  );
}

export default Select;
