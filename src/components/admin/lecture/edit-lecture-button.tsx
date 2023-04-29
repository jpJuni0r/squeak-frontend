import React, {useMemo, useState} from "react"
import {useMutation} from "@apollo/client";
import {Config, FORM_ERROR} from "final-form";
import {Pencil} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import LectureForm, {LectureFormValues} from "@/components/admin/lecture/lecture-form";
import {Faculty, Lecture} from "@/model/generated/graphql";
import {gql} from "@/model/generated";

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

const updateLectureAliasesMutation = gql(`
mutation updateLectureAliases(
  $lectureId: LectureId!
  $aliases: [String!]!
) {
  updateLectureAliases(
    lectureId: $lectureId
    aliases: $aliases,
    removeExisting: true
  ) {
    ... on Lecture {
      id
    }
    ... on InvalidIdError {
      msg
    }
    ... on GeneralError {
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
  const [updateLectureAliases] = useMutation(updateLectureAliasesMutation)

  const onSubmit: Config<LectureFormValues>["onSubmit"] = async (values) => {
    const lectureResponse = await updateLecture({variables: {
        data: {
          name: values.name!,
          comment: {
            value: values.comment || null
          },
          facultyId: values.facultyId!,
        },
        lectureId: lecture.id,
      }})

    if (lectureResponse.errors) {
      return {
        [FORM_ERROR]: lectureResponse.errors.map(e => e.message).join(", ")
      }
    }

    if (lectureResponse.data!.updateLecture.__typename === "InvalidIdError"
      || lectureResponse.data!.updateLecture.__typename === "StringTooLargeError"
      || lectureResponse.data!.updateLecture.__typename === "GeneralError") {

      return {
        [FORM_ERROR]: lectureResponse.data!.updateLecture.msg
      }
    }

    const lectureAliasesResponse = await updateLectureAliases({
      variables: {
        lectureId: lecture.id,
        aliases: values.aliases.map(a => a.value),
      },
    })

    if (lectureAliasesResponse.errors) {
      return {
        [FORM_ERROR]: lectureResponse.errors,
      }
    }

    if (
      lectureAliasesResponse.data?.updateLectureAliases.__typename === "InvalidIdError"
      || lectureAliasesResponse.data?.updateLectureAliases.__typename === "GeneralError"
      || lectureAliasesResponse.data?.updateLectureAliases.__typename === "StringTooLargeError"
    ) {
      return {
        [FORM_ERROR]: lectureAliasesResponse.data!.updateLectureAliases.msg
      }
    } else if (lectureAliasesResponse.data?.updateLectureAliases.__typename !== "Lecture") {
      return {
        [FORM_ERROR]: `Received an unknown response to update lecture aliases: ${lectureAliasesResponse.data?.updateLectureAliases.__typename}`,
      }
    }

    setShow(false)
    refresh()
  }

  const initialValues: LectureFormValues = useMemo(() => ({
    name: lecture.displayName,
    validated: lecture.validated,
    comment: lecture.comment || undefined,
    aliases: lecture.aliases.map(alias => ({
      label: alias,
      value: alias,
    })),
  }), [lecture])

  return (
    <>
      <button type="button" className="btn btn-sm btn-link" onClick={() => setShow(true)}>
        <Pencil />
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {lecture.displayName}</Modal.Title>
        </Modal.Header>
        <LectureForm
          faculties={faculties}
          onSubmit={onSubmit}
          initialValues={initialValues}
          hideValidatedField
          showAliasesField
        />
      </Modal>
    </>
  )
}

export default EditLectureButton
