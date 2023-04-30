import React, {useMemo, useState} from "react"
import {UploadsQuery, UploadState} from "@/model/generated/graphql";
import {Pencil} from "react-bootstrap-icons";
import {SelectOption} from "@/components/form/select-field";
import {FormSelect, Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {uploadStateOptions} from "@/shared/enum-select-options";
import CheckboxField from "@/components/form/checkbox-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import {gql} from "@/model/generated";
import {useMutation} from "@apollo/client";
import {FORM_ERROR} from "final-form";

interface Props {
  upload: UploadsQuery["uploads"]["results"][0],
}

interface FormValues {
  state: SelectOption,
  depositAvailable?: boolean
  rewardAvailable?: boolean
}

const updateUploadStateMutation = gql(`
mutation updateUploadStateMutation(
  $uploadId: UploadId!
  $uploadInput: UploadStateInput!
  $public: Boolean
) {
  updateUploadState(
    uploadId: $uploadId
    uploadInput: $uploadInput
    public: $public
  ) {
    ... on DocumentUpload {
      id
      state
      depositAvailable
      rewardAvailable
      document {
        id
        public
      }
    }
    ... on Error {
      msg
    }
  }
}
`)


const EditUploadButton = ({upload}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [updateUploadState] = useMutation(updateUploadStateMutation)

  const onSubmit = async (values: FormValues) => {
    const response = await updateUploadState({
      variables: {
        uploadId: upload.id,
        uploadInput: {
          state: values.state!.value as UploadState,
          depositAvailable: values.depositAvailable,
          // TODO: The server seems to ignore this value. It's not settable to true.
          rewardAvailable: values.rewardAvailable,
        },
        public: null,
      }
    })

    if (response.errors) {
      return {
        [FORM_ERROR]: response.errors.map(e => e.message).join(", "),
      }
    } else if (
      response.data!.updateUploadState.__typename === "InvalidIdError"
      || response.data!.updateUploadState.__typename === "GeneralError"
    ) {
      return {
        [FORM_ERROR]: response.data!.updateUploadState.msg
      }
    } else if (response.data!.updateUploadState.__typename !== "DocumentUpload") {
      return {
        [FORM_ERROR]: "Received an unknown response type"
      }
    }

    // Everything is OK. No need to refresh the list, because the cache is updated automatically.
    setShowModal(false)
  }

  const initialValues = useMemo<Partial<FormValues>>(() => ({
    state: uploadStateOptions.find(o => o.value === upload.state),
    depositAvailable: upload.depositAvailable,
    rewardAvailable: upload.rewardAvailable,
  }), [upload])

  return (
    <>
      <button className="btn btn-sm" onClick={() => setShowModal(true)}>
        <Pencil/>
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Upload</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({handleSubmit, submitting, submitError}) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <SelectAutocompleteField name="state" label="State" options={uploadStateOptions} isRequired/>
                <CheckboxField name="depositAvailable" label="Deposit available"/>
                <CheckboxField name="rewardAvailable" label="Reward available"/>
                {submitError && <div className="text-danger">{submitError}</div>}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Submit
                </button>
              </Modal.Footer>
            </form>
          )}
        >
        </Form>
      </Modal>
    </>
  )
}

export default EditUploadButton
