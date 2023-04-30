import React from "react";
import SelectCreatable from "react-select/creatable";
import { Field } from "react-final-form";
import {SelectOption} from "@/components/form/select-field";
import {isQualifiedTypeIdentifier} from "@babel/types";

interface Props<FieldValue> {
  name: string;
  label: string;
  options: FieldValue[];
  isRequired?: boolean;
}

const SelectCreatableField = <FieldValue extends SelectOption,>({ name, label, options, isRequired }: Props<FieldValue>) => {
  return (
    <Field<FieldValue>
      name={name}
      type="select"
      multiple
      validate={(x, fields) => {
        const value = (fields as any)[name]
        if (isRequired) {
          if (!value || !value.length) {
            return "Value is required"
          }
        }
        return null
      }}
      render={({ input, meta }) => (
        <div>
          <label htmlFor={input.name}>{label}{isRequired? <span className="text-danger">*</span> : null}</label>
          <SelectCreatable
            {...input}
            options={options}
            placeholder={`Select options...`}
            required={isRequired}
            className={(meta.touched && meta.error) ? "is-invalid" : undefined}
            isMulti
          />
          {meta.error && <small className="invalid-feedback">{meta.error}</small>}
        </div>
      )}
    />
  );
};

export default SelectCreatableField;
