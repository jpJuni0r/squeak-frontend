import React from "react"
import {Field} from "react-final-form";

interface Props {
  name: string
  label: string
}

const FileField = ({name, label}: Props) => {
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
          />
        </div>
      )}
    />
  )
}

export default FileField
