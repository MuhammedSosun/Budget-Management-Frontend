import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="select-group" ref={selectRef}>
      {label && <label className="select-group__label">{label}</label>}

      <button
        type="button"
        className={`select-group__trigger ${
          error ? "select-group__trigger--error" : ""
        } ${isOpen ? "select-group__trigger--open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
      >
        <span className="select-group__value">
          {selectedOption?.label || "Select"}
        </span>

        <span className="select-group__chevron">⌄</span>
      </button>

      {isOpen && (
        <div className="select-group__menu" role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`select-group__option ${
                  isSelected ? "select-group__option--selected" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="select-group__check">
                  {isSelected ? "✓" : ""}
                </span>

                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {error && <span className="select-group__error-text">{error}</span>}
    </div>
  );
}

export default Select;
