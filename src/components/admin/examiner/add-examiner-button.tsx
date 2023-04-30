import React, {useState} from "react"
import {useMutation} from "@apollo/client";
import {Config, FORM_ERROR} from "final-form";
import {Plus} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import ExaminerForm, {ExaminerFormValues} from "@/components/admin/examiner/examiner-form";
import {gql} from "@/model/generated";

interface Props {
  refresh: () => void;
}

const createExaminerMutation = gql(`
mutation createExaminer(
  $data: ExaminerInput!
  $validated: Boolean!
) {
  createExaminer(
    data: $data
    validated: $validated
  ) {
    ... on Examiner {
      id
    }
    ... on StringTooLargeError {
      msg
    }
    ... on GeneralError {
      msg
    }
    ... on Error {
      msg
    }
  }
}
`)

const AddExaminerButton = ({refresh} : Props) => {
  const [showModal, setShowModal] = useState(false)
  const [createExaminer] = useMutation(createExaminerMutation)

  const onSubmit: Config<ExaminerFormValues>["onSubmit"] = async (values) => {
    const response = await createExaminer({
      variables: {
        data: {
          name: values.name!,
          prename: values.prename || null,
          institute: values.institute || null,
        },
        validated: values.validated || false
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    }

    if (response.data!.createExaminer.__typename === "StringTooLargeError"
      || response.data!.createExaminer.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.createExaminer.msg
      }
    }

    setShowModal(false)
    refresh()
  }

  return (
    <>
      <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
        <Plus/> Add Examiner
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Examiner</Modal.Title>
        </Modal.Header>
        <ExaminerForm onSubmit={onSubmit}/>
      </Modal>
    </>
  )
}

export default AddExaminerButton
