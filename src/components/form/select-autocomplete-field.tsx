import React from "react";
import Select from "react-select";
import { Field } from "react-final-form";
import {SelectOption} from "@/components/form/select-field";

interface Props<FieldValue> {
  name: string;
  label: string;
  options: FieldValue[];
  isMulti?: boolean;
}

const SelectAutocompleteField = <FieldValue extends SelectOption,>({ name, label, options, isMulti }: Props<FieldValue>) => {
  return (
    <Field<FieldValue>
      name={name}
      type="select"
      multiple={isMulti}
      render={({ input, meta }) => (
        <div className="mb-3">
          <label htmlFor={input.name}>{label}</label>
          <Select {...input} isMulti={isMulti} options={options} placeholder={`Select ${isMulti ? "options" : "options" }...`} />
          {meta.error && <small className="text-danger">{meta.error}</small>}
        </div>
      )}
    />
  );
};

export default SelectAutocompleteField;
