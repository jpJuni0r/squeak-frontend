import React from "react"
import {Faculty} from "@/model/generated/graphql";
import {Config} from "final-form";
import {Form} from "react-final-form";
import {Modal} from "react-bootstrap";
import TextField from "@/components/form/text-field";
import SelectField, {SelectOption} from "@/components/form/select-field";
import CheckboxField from "@/components/form/checkbox-field";

interface Props {
  faculties: Faculty[],
  onSubmit: Config<LectureFormValues>["onSubmit"];
  initialValues?: Partial<LectureFormValues>,
  // This is an extra option, because the validated field is not editable
  hideValidatedField?: boolean;
}

export interface LectureFormValues {
  name?: string;
  facultyId?: string;
  comment?: string;
  validated?: boolean;
}

/**
 * This component is meant to be placed only inside a modal.
 */
const LectureForm = ({ faculties, initialValues, onSubmit, hideValidatedField }: Props) => {
  const options: SelectOption[] = faculties.map(f => ({
    label: f.displayName,
    value: f.id,
  }))

  const patchedInitialValues = {
    ...initialValues
  }

  if (!initialValues?.facultyId && faculties.length) {
    patchedInitialValues.facultyId = faculties[0].id
  }
  if (initialValues?.validated === undefined) {
    patchedInitialValues.validated = true
  }

  return (
    <Form<LectureFormValues>
      onSubmit={onSubmit}
      initialValues={patchedInitialValues}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <form onSubmit={handleSubmit} className="vstack gap-3">
          <Modal.Body>
            <div className="vstack gap-3">
              <TextField name="name" label="Name" isRequired />
              <SelectField name="facultyId" label="Faculty" options={options} />
              <TextField name="comment" label="Comment" />
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

export default LectureForm
