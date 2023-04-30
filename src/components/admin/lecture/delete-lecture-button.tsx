import React, {useState} from "react"
import {LecturesQuery} from "@/model/generated/graphql";
import {Pencil, Trash} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  lecture: LecturesQuery["lectures"][0];
  refresh: () => void;
}

const deleteLectureMutation = gql(`
mutation deleteLecture(
  $lectureId: LectureId!
) {
  deleteLecture(lectureId: $lectureId) {
    ... on Lecture {
      id
    }
    ... on Error {
      msg
    }
  }
}
`)

interface FormValues {
}

const DeleteLectureButton = ({lecture, refresh}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [deleteLecture] = useMutation(deleteLectureMutation)

  const onSubmit = async (values: FormValues) => {
    const response = await deleteLecture({
      variables: {
        lectureId: lecture.id,
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    } else if (
      response.data!.deleteLecture.__typename === "GeneralError"
      || response.data!.deleteLecture.__typename === "InvalidIdError"
    ) {
      return {
        [FORM_ERROR]: response.data!.deleteLecture.msg,
      }
    } else if (
      response.data!.deleteLecture.__typename !== "Lecture"
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
        <Trash />
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete lecture</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <div>
                  Do you wish to delete the lecture {lecture.displayName}?
                </div>
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-danger" disabled={submitting}>
                  Delete
                </button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default DeleteLectureButton
