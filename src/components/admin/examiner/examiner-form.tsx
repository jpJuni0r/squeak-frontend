import React from "react"
import {Config} from "final-form";
import {Form} from "react-final-form";
import {Modal} from "react-bootstrap";
import TextField from "@/components/form/text-field";
import CheckboxField from "@/components/form/checkbox-field";

interface Props {
  onSubmit: Config<ExaminerFormValues>["onSubmit"]
  initialValues?: Partial<ExaminerFormValues>
  // This is an extra option, because the validated field is not editable
  hideValidatedField?: boolean;
}

export interface ExaminerFormValues {
  name?: string
  prename?: string,
  institute?: string
  validated?: boolean;
}

const ExaminerForm = ({ onSubmit, initialValues, hideValidatedField }: Props) => {
  const patchedInitialValues = {
    ...initialValues,
  }

  if (initialValues?.validated === undefined) {
    patchedInitialValues.validated = true
  }

  return (
    <Form<ExaminerFormValues>
      onSubmit={onSubmit}
      initialValues={patchedInitialValues}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="vstack gap-3">
              <TextField name="name" label="Name" isRequired />
              <TextField name="prename" label="Prename" />
              <TextField name="institute" label="Institute" />
              {!hideValidatedField && (
                <CheckboxField name="validated" label="Validated" />
              )}
              {submitError && <div className="text-danger">{submitError}</div>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              Submit
            </button>
          </Modal.Footer>
        </form>
      )}
    />
  )
}

export default ExaminerForm
