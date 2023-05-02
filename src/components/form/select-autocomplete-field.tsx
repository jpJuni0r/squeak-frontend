import React from "react";
import Select from "react-select";
import { Field } from "react-final-form";
import {SelectOption} from "@/components/form/select-field";
import {isQualifiedTypeIdentifier} from "@babel/types";

interface Props<FieldValue> {
  name: string;
  label: string;
  options: FieldValue[];
  defaultValue?: FieldValue
  isMulti?: boolean;
  isRequired?: boolean;
}

const SelectAutocompleteField = <FieldValue extends SelectOption,>({ name, label, options, defaultValue, isMulti, isRequired }: Props<FieldValue>) => {
  return (
    <Field<FieldValue>
      name={name}
      type="select"
      multiple={isMulti}
      defaultValue={defaultValue}
      validate={(x, fields) => {
        if (!isRequired)  {
          return null
        }
        const value = (fields as any)[name]
        if (isMulti) {
          if (!value || !value.length) {
            return "Value is required"
          }
        } else {
          if (!value) {
            return "Value is required"
          }
        }
        return null
      }}
      render={({ input, meta }) => (
        <div>
          <label htmlFor={input.name}>{label}{isRequired? <span className="text-danger">*</span> : null}</label>
          <Select
            {...input}
            isMulti={isMulti}
            options={options}
            placeholder={`Select ${isMulti ? "options" : "option" }...`}
            required={isRequired}
            className={(meta.touched && meta.error) ? "is-invalid" : undefined}
          />
          {meta.error && <small className="invalid-feedback">{meta.error}</small>}
        </div>
      )}
    />
  );
};

export default SelectAutocompleteField;
