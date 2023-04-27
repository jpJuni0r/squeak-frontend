import React from "react"
import {Field} from "react-final-form";
import {CurrencyEuro} from "react-bootstrap-icons";

interface Props {
  name: string
  label: string
  isRequired?: boolean;
  minorDigits?: number
}

const MoneyField = ({name, label, isRequired, minorDigits}: Props) => {
  const decimalSeparator = ","
  return (
    <Field<string>
      name={name}
      validate={(value) => {
        if (value) {
          const parts = value.split(decimalSeparator)
          const number = /^[0-9]*$/
          if (parts.length === 1) {
            if (!number.test(parts[0])) {
              return "Invalid format"
            }
          } else if (
            parts.length !== 2 || parts[0] === ""
            || !number.test(parts[0]) || !number.test(parts[1])
            || parts[1].length > (minorDigits || 2)
          ) {
            return "Invalid format"
          }
        }
      }}
      render={({ input, meta }) => (
        <div>
          <label htmlFor={input.name}>{label}</label>
          <div className="input-group">
            <span className="input-group-text">
              <CurrencyEuro/>
            </span>
            <input
              type="text"
              {...input}
              id={input.name}
              className={`form-control${meta.touched && meta.error ? " is-invalid" : ""}`}
              required={isRequired}
              placeholder={`3${decimalSeparator}52`}
            />
            {meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>  }
          </div>
        </div>
      )}
    />
  )
}

export default MoneyField

