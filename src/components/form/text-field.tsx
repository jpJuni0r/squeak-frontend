import React from "react";
import { Field } from "react-final-form";
import { FieldValidator } from "final-form";

interface Props {
  name: string;
  label: string;
  type?: "text" | "password" | "date" | "number" | "url";
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
  validate?: FieldValidator<string>;
  pattern?: string;
}

const TextField = ({ name, label, type, placeholder, validate, pattern, isRequired, isDisabled, autoFocus }: Props) => {
  if (!type) {
    type = "text";
  }

  return (
    <Field
      name={name}
      validate={validate}
      render={({ input, meta }) => (
        <div>
          <label htmlFor={input.name}>
            {label}
            {isRequired && <span className="text-danger">*</span>}
          </label>
          <input
            type={type}
            {...input}
            className={`form-control${(meta.touched && meta.error) ? " is-invalid" : ""}`}
            id={input.name}
            placeholder={placeholder}
            pattern={pattern}
            required={isRequired}
            disabled={isDisabled}
            autoFocus={autoFocus}
          />
          {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
        </div>
      )}
    />
  );
};

export default TextField;
