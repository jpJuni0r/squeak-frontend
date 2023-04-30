import React, {useState} from "react"
import {Hourglass} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {LecturesQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  lecture: LecturesQuery["lectures"][0]
  refresh: () => void;
}

const validateLectureMutation = gql(`
mutation validateLecture(
  $lectureId: LectureId!
) {
  validateLecture(lectureId: $lectureId) {
    ... on Lecture {
      id
      validated
    }
    ... on InvalidIdError {
      msg
    }
  }
}
`)

interface FormValues {
}

const LectureValidateButton = ({lecture, refresh}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [validateLecture] = useMutation(validateLectureMutation)

  const onSubmit = async (values: FormValues) => {
    const response = await validateLecture({
      variables: {
        lectureId: lecture.id,
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    } else if (response.data!.validateLecture.__typename === "InvalidIdError") {
      return {
        [FORM_ERROR]: response.data!.validateLecture.msg
      }
    } else if (response.data!.validateLecture.__typename !== "Lecture") {
      return {
        [FORM_ERROR]: "Received an unknown response from the server",
      }
    }

    setShowModal(false)
    refresh()
  }

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Hourglass/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Validate lecture</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <div>
                  Confirm the validation of the lecture below.
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

export default LectureValidateButton
