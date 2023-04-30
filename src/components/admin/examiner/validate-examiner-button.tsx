import React, {useState} from "react"
import {ExaminersQuery, LecturesQuery} from "@/model/generated/graphql";
import {Hourglass, Pencil, Trash} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  examiner: ExaminersQuery["examiners"][0];
  refresh: () => void;
}

const validateExaminerMutation = gql(`
mutation validateExaminer(
  $examinerId: ExaminerId!
) {
  validateExaminer(
    examinerId: $examinerId
  ) {
    ... on Examiner {
      id
      validated
    }
    ... on Error {
      msg
    }
  }
}
`)

interface FormValues {
}

const ValidateExaminerButton = ({examiner, refresh}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [deleteExaminer] = useMutation(validateExaminerMutation)

  const onSubmit = async (values: FormValues) => {
    const response = await deleteExaminer({
      variables: {
        examinerId: examiner.id,
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    } else if (
      response.data!.validateExaminer.__typename === "InvalidIdError"
    ) {
      return {
        [FORM_ERROR]: response.data!.validateExaminer.msg,
      }
    } else if (
      response.data!.validateExaminer.__typename !== "Examiner"
    ) {
      return {
        [FORM_ERROR]: "Received an unknown response",
      }
    }

    setShowModal(false)
    refresh()
  }

  return (
    <>
      <button type="button" className="btn btn-sm btn-link" onClick={() => setShowModal(true)}>
        <Hourglass />
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Validate examiner</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <div>
                  Confirm the validation of the examiner below.
                </div>
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Validate
                </button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default ValidateExaminerButton
