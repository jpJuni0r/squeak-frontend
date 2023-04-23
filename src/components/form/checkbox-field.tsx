import React from "react";
import { Field } from "react-final-form";

interface Props {
  name: string;
  label: string;
}

const CheckboxField = ({ name, label }: Props) => {
  return (
    <Field
      name={name}
      type="checkbox"
      render={({ input }) => (
        <div className="form-check">
          <input {...input} id={input.name} className="form-check-input" />
          <label htmlFor={input.name} className="form-check-label">
            {label}
          </label>
        </div>
      )}
    />
  );
};

export default CheckboxField;
