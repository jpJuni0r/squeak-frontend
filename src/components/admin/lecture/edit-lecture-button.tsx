import React, {useState} from "react"
import {Faculty, Lecture} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {Config, FORM_ERROR} from "final-form";
import LectureForm, {LectureFormValues} from "@/components/admin/lecture/lecture-form";
import {Pencil} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";

interface Props {
  lecture: Lecture;
  faculties: Faculty[];
  refresh: () => void;
}

const updateLectureMutation = gql(`
mutation updateLecture(
  $lectureId: LectureId!
  $data: LectureUpdateInput!
) {
  updateLecture(
    lectureId: $lectureId
    data: $data
  ) {
    ... on Lecture {
      id
    }
    ... on InvalidIdError {
      msg
    }
    ... on StringTooLargeError {
      msg
    }
    ... on Error {
      msg
    }
  }
}
`)

const EditLectureButton = ({ lecture, faculties, refresh}: Props) => {
  const [show, setShow] = useState(false)
  const [updateLecture] = useMutation(updateLectureMutation)

  const onSubmit: Config<LectureFormValues>["onSubmit"] = async (values) => {
    const response = await updateLecture({variables: {
        data: {
          name: values.name!,
          comment: {
            value: values.comment || null
          },
          facultyId: values.facultyId!,
        },
        lectureId: lecture.id,
      }})

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    }

    if (response.data!.updateLecture.__typename === "InvalidIdError"
      || response.data!.updateLecture.__typename === "StringTooLargeError"
      || response.data!.updateLecture.__typename === "GeneralError") {

      return {
        [FORM_ERROR]: response.data!.updateLecture.msg
      }
    }

    setShow(false)
    refresh()
  }

  const initialValues: LectureFormValues = {
    name: lecture.displayName,
    validated: lecture.validated,
    comment: lecture.comment || undefined,
  }

  return (
    <>
      <button type="button" className="btn btn-sm btn-link" onClick={() => setShow(true)}>
        <Pencil />
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {lecture.displayName}</Modal.Title>
        </Modal.Header>
        <LectureForm faculties={faculties} onSubmit={onSubmit} initialValues={initialValues} hideValidatedField />
      </Modal>
    </>
  )
}

export default EditLectureButton
