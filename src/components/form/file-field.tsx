import React from "react"
import {Field} from "react-final-form";

interface Props {
  name: string
  label: string
  isRequired?: boolean
}

const FileField = ({name, label, isRequired}: Props) => {
  return (
    <Field
      name={name}
      type="file"
      render={({ input: { value, onChange, ...input} }) => (
        <div>
          <label htmlFor={input.name}>{label}</label>
          <input
            {...input}
            className="form-control"
            onChange={e => onChange(e.target.files)}
            required={isRequired}
          />
        </div>
      )}
    />
  )
}

export default FileField
