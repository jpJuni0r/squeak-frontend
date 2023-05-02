import React, {useMemo, useState} from "react"
import {Plus} from "react-bootstrap-icons";
import DepositForm, {DepositFormValues} from "@/components/admin/deposits/deposit-form";
import {DepositsQuery} from "@/model/generated/graphql";
import {Modal} from "react-bootstrap";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  lectures: DepositsQuery["lectures"]
  refresh: () => void;
}

const createDepositMutation = gql(`
mutation createDeposit(
  $data: DepositInput!
  $accountingPositionId: AccountingPositionId!
) {
  createDeposit(
    data: $data
    accountingPositionId: $accountingPositionId
  ) {
    ... on Transaction {
      id
    }
    ... on Error {
      msg
    }
  }
}
`)

const AddDepositButton = ({lectures, refresh}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [createDeposit] = useMutation(createDepositMutation)

  const onSubmit = async (values: DepositFormValues) => {
    const response = await createDeposit({
      variables: {
        accountingPositionId: values.accountingPosition!.value,
        data: {
          tag: values.tag!,
          lectureIds: values.lectures.map(l => l.value),
          comment: values.comment,
        }
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message),
      }
    } else if (
      response.data!.createDeposit.__typename === "InvalidIdError"
      || response.data!.createDeposit.__typename === "GeneralError"
      || response.data!.createDeposit.__typename === "StringTooLargeError"
    ) {
      return {
        [FORM_ERROR]: response.data!.createDeposit.msg,
      }
    } else if (response.data!.createDeposit.__typename !== "Transaction") {
      return {
        [FORM_ERROR]: "Received unexpected response type from server",
      }
    }

    setShowModal(false)
    refresh()
  }

  return (
    <>
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setShowModal(true)}>
        <Plus/> Add deposit
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            Add deposit
          </Modal.Title>
        </Modal.Header>
        <DepositForm lectures={lectures} onSubmit={onSubmit} showAccountingPositionField/>
      </Modal>
    </>
  )
}

export default AddDepositButton
