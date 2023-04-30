import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {ExaminersQuery} from "@/model/generated/graphql";
import {useMemo, useState} from "react";
import {Pencil} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import ExaminerForm, {ExaminerFormValues} from "@/components/admin/examiner/examiner-form";
import {FORM_ERROR} from "final-form";

interface Props {
  examiner: ExaminersQuery["examiners"][0]
  refresh: () => void
}

const updateExaminerMutation = gql(`
mutation updateExaminer(
  $examinerId: ExaminerId!
  $data: ExaminerUpdateInput!
) {
   updateExaminer(
    examinerId: $examinerId
    data: $data
  ) {
    ... on Examiner {
      id
    }
    ... on Error {
      msg
    }
  }
}
`)

const EditExaminerButton = ({examiner, refresh}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [updateExaminer] = useMutation(updateExaminerMutation)

  const onSubmit = async (values: ExaminerFormValues) => {
    const response = await updateExaminer({
      variables: {
        examinerId: examiner.id,
        data: {
          name: values.name!,
          prename: {
            value: values.prename || null,
          },
          institute: {
            value: values.institute || null,
          },
        },
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
      }
    } else if (
      response.data!.updateExaminer.__typename === "InvalidIdError"
      || response.data!.updateExaminer.__typename === "StringTooLargeError"
      || response.data!.updateExaminer.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.updateExaminer.msg,
      }
    } else if (response.data!.updateExaminer.__typename !== "Examiner") {
      return {
        [FORM_ERROR]: "Received an unknown response",
      }
    }

    setShowModal(false)
    refresh()
  }

  const initialValues = useMemo<Partial<ExaminerFormValues>>(() => ({
    name: examiner.name,
    prename: examiner.prename || undefined,
    institute: examiner.institute || undefined,
    validated: examiner.validated,
  }), [examiner])

  return (
    <>
      <button type="button" className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Pencil/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit examiner</Modal.Title>
        </Modal.Header>
        <ExaminerForm initialValues={initialValues} onSubmit={onSubmit} hideValidatedField/>
      </Modal>
    </>
  )
}

export default EditExaminerButton
