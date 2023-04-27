import React, {useState} from "react"
import {Plus} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Config, FORM_ERROR} from "final-form";
import {useMutation} from "@apollo/client";
import {Faculty} from "@/model/generated/graphql";
import LectureForm, {LectureFormValues} from "@/components/admin/lecture/lecture-form";
import {gql} from "@/model/generated";

interface Props {
  faculties: Faculty[]
  refresh: () => void;
}

const createLectureMutation = gql(`
mutation createLecture(
  $data: LectureInput!
  $validated: Boolean!
) {
   createLecture(data: $data, validated: $validated) {
    __typename
    ... on Lecture {
      id
    }
    ... on InvalidIdError {
      errorCode
      msg
    }
    ... on GeneralError {
      errorCode
      msg
    }
    ... on StringTooLargeError {
      errorCode
      msg
    }
    ... on Error {
      errorCode
      msg
    }
  }
}
`)

const AddLectureButton = ({faculties, refresh}: Props) => {
  const [show, setShow] = useState(false)
  const [createLecture] = useMutation(createLectureMutation, {errorPolicy: "none"})

  const onSubmit: Config<LectureFormValues>["onSubmit"] = async (values) => {
    const response = await createLecture({
      variables: {
        data: {
          name: values.name!,
          comment: values.comment || null,
          facultyId: values.facultyId!,
        },
        validated: values.validated || false,
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    }

    if (response.data!.createLecture.__typename === "InvalidIdError"
      || response.data!.createLecture.__typename === "StringTooLargeError"
      || response.data!.createLecture.__typename === "GeneralError") {

      return {
        [FORM_ERROR]: response.data!.createLecture.msg
      }
    }

    setShow(false)
    refresh()
  }

  return (
    <>
      <button type="button" className="btn btn-outline-primary" onClick={() => setShow(true)}>
        <Plus/> Add Lecture
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lecture</Modal.Title>
        </Modal.Header>
        <LectureForm faculties={faculties} onSubmit={onSubmit}/>
      </Modal>
    </>
  )
}

export default AddLectureButton
