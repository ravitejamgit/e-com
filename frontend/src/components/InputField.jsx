import { useState } from "react";

function EyeIcon({ visible }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  showToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const resolvedType = showToggle
    ? showPassword ? "text" : "password"
    : type;

  return (
    <div className="input-field">
      <label htmlFor={id} className="input-field__label">
        {label}
      </label>

      <div className="input-field__wrapper">
        <input
          id={id}
          type={resolvedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`input-field__input ${error ? "input-field__input--error" : ""} ${showToggle ? "input-field__input--has-toggle" : ""}`}
        />

        {showToggle && (
          <button
            type="button"
            className="input-field__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            <EyeIcon visible={showPassword} />
          </button>
        )}
      </div>

      {error && (
        <span className="input-field__error">{error}</span>
      )}
    </div>
  );
}