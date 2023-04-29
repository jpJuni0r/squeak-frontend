import React, {useState} from "react"
import {Eject} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {UploadsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useApolloClient, useMutation} from "@apollo/client";
import {SelectOption} from "@/components/form/select-field";
import AccountingPositionField from "@/components/form/accounting-position-field";
import CheckboxField from "@/components/form/checkbox-field";
import DepositField from "@/components/admin/document-uploads/deposit-field";
import {FORM_ERROR} from "final-form";

interface Props {
  upload: UploadsQuery["uploads"]["results"][0],
  refetch: () => void
}

const returnDepositMutation = gql(`
mutation returnDeposit(
  $depositId: DepositId!
  $uploadId: UploadId!
  $accountingPositionId: AccountingPositionId!
  $force: Boolean!
) {
  returnDeposit(
    depositId: $depositId
    uploadId: $uploadId
    accountingPositionId: $accountingPositionId
    force: $force
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

interface FormValues {
  deposit?: string
  accountingPosition?: SelectOption
  force?: boolean
}

const PayoutDepositButton = ({upload, refetch}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [returnDeposit] = useMutation(returnDepositMutation)
  const client = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const response = await returnDeposit({
      variables: {
        uploadId: upload.id,
        accountingPositionId: values.accountingPosition!.value,
        force: values.force || false,
        depositId: values.deposit!
      },
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.name).join(", ")
      }
    } else if (
      response.data!.returnDeposit.__typename === "InvalidIdError"
      || response.data!.returnDeposit.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.returnDeposit.msg
      }
    } else if (response.data!.returnDeposit.__typename !== "Transaction") {
      return {
        [FORM_ERROR]: "Received an unknown response"
      }
    }

    setShowModal(false)
    refetch()
  }

  return (
    <>
      <button type="button" className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Eject/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Payout deposit</Modal.Title>
        </Modal.Header>
        <Form<FormValues>
          onSubmit={onSubmit}
          render={({handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <DepositField name="deposit" />
                <AccountingPositionField name="accountingPosition" />
                <CheckboxField name="force" label="Force transaction" />
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Submit
                </button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default PayoutDepositButton
