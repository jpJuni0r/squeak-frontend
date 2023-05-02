import React, {useMemo, useState} from "react"
import {DepositsQuery} from "@/model/generated/graphql";
import {Modal} from "react-bootstrap";
import DepositForm, {DepositFormValues} from "@/components/admin/deposits/deposit-form";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";
import {Pencil} from "react-bootstrap-icons";

const updateDepositMutation = gql(`
mutation updateDeposit(
  $depositId: DepositId!
  $data: DepositUpdateInput!
) {
  updateDeposit(
    depositId: $depositId
    data: $data
  ) {
    ... on Deposit {
      id
      tag
      comment
      lectures {
        id
        displayName
      }
    }
    ... on Error {
      msg
    }
  }
}
`)

interface Props {
  deposit: DepositsQuery["deposits"]["results"][0],
  lectures: DepositsQuery["lectures"],
}

const EditDepositButton = ({deposit, lectures}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [updateDeposit] = useMutation(updateDepositMutation)

  const onSubmit = async (values: DepositFormValues) => {
    const response = await updateDeposit({
      variables: {
        depositId: deposit.id,
        data: {
          tag: values.tag!,
          lectureIds: values.lectures.map(l => l.value),
          comment: {
            value: values.comment || null,
          },
        },
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", ")
      }
    } else if (
      response.data!.updateDeposit.__typename === "StringTooLargeError"
      || response.data!.updateDeposit.__typename === "InvalidIdError"
      || response.data!.updateDeposit.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.updateDeposit.msg,
      }
    } else if (response.data!.updateDeposit.__typename !== "Deposit") {
      return {
        [FORM_ERROR]: "Received unknown response type",
      }
    }

    setShowModal(false)
  }

  const defaultValues = useMemo<Partial<DepositFormValues>>(() => ({
    tag: deposit.tag,
    lectures: deposit.lectures.map(l => ({label: l.displayName, value: l.id})),
    comment: deposit.comment || undefined,
  }), [deposit])

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Pencil/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Deposit</Modal.Title>
        </Modal.Header>
        <DepositForm defaultValues={defaultValues} lectures={lectures} onSubmit={onSubmit}/>
      </Modal>
    </>
  )
}

export default EditDepositButton
