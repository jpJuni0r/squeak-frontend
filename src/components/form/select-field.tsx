import React from "react";
import { Field } from "react-final-form";

interface Props {
  name: string;
  label?: string;
  options: SelectOption[];
  isMulti?: boolean;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

// field value is `{label: string, value: string}`
const SelectField = ({ name, label, options, isMulti }: Props) => {
  return (
    <Field
      name={name}
      type="select"
      multiple={isMulti}
      render={({ input, meta }) => (
        <div>
          {label && <label htmlFor={input.name}>{label}</label>}
          <select {...input} id={input.name} className="form-control">
            {options.map(option => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
            {!isMulti && !options.some(o => o.value === input.value) && (
              <option value={input.value}>{input.value}</option>
            )}
          </select>
          {isMulti && (
            <small className="form-text text-muted">Strg. + klicken für Mehrfachauswahl oder zum Aufheben</small>
          )}
          {meta.invalid && meta.touched && <small className="text-danger">{meta.error}</small>}
        </div>
      )}
    />
  );
};

export default SelectField;
