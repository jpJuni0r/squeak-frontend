import React, {useState} from "react"
import {CurrencyDollar} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {FORM_ERROR} from "final-form";
import {UploadsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {SelectOption} from "@/components/form/select-field";
import CheckboxField from "@/components/form/checkbox-field";
import AccountingPositionField from "@/components/form/accounting-position-field";

interface Props {
  upload: UploadsQuery["uploads"]["results"][0],
}

const payoutRewardMutation = gql(`
mutation payoutReward(
  $uploadId: UploadId!
  $accountingPositionId: AccountingPositionId!
  $force: Boolean!
) {
  payoutReward(
    uploadId: $uploadId
    accountingPositionId: $accountingPositionId
    force: $force
  ) {
    ... on Transaction {
      id
      value
    }
    ... on Error {
      msg
    }
  }
}
`)

interface FormValues {
  accountingPosition?: SelectOption
  force?: boolean
}

const PayoutRewardButton = ({upload}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [payoutReward] = useMutation(payoutRewardMutation)

  const onSubmit = async (values: FormValues) => {
    const response = await payoutReward({
      variables: {
        uploadId: upload.id,
        accountingPositionId: values.accountingPosition!.value,
        force: values?.force || false,
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
      }
    } else if (
      response.data!.payoutReward.__typename === "InvalidIdError"
      || response.data!.payoutReward.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.payoutReward.msg
      }
    } else if (response.data!.payoutReward.__typename !== "Transaction") {
      return {
        [FORM_ERROR]: "Received unknown response type"
      }
    }

    // Everything is OK
    setShowModal(false)
  }

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <CurrencyDollar/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Payout</Modal.Title>
        </Modal.Header>
        <Form<FormValues>
          onSubmit={onSubmit}
          render={({handleSubmit,submitting, submitError}) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <AccountingPositionField name="accountingPosition" />
                <CheckboxField name="force" label="Force transaction"/>
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-primary" disabled={submitting}>
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

export default PayoutRewardButton
