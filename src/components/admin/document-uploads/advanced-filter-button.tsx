import React, {useMemo, useState} from "react"
import {Plus} from "react-bootstrap-icons";
import {Modal} from "react-bootstrap";
import {Form} from "react-final-form";
import {UploadFilter, UploadState} from "@/model/generated/graphql";
import {SelectOption} from "@/components/form/select-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import CheckboxField from "@/components/form/checkbox-field";
import {uploadStateOptions} from "@/shared/enum-select-options";
import TextField from "@/components/form/text-field";
import {keyToLabel} from "@/components/admin/document-uploads/upload-filter-tag";

interface Props {
  addFilter: (filter: UploadFilter) => void
}

interface FormValues {
  type: SelectOption
  tagIsPresent?: boolean
  state: SelectOption[]
  createdBefore?: string
  createdAfter?: string
  depositAvailable?: boolean
  rewardAvailable?: boolean
}

const AdvancedFilterButton = ({addFilter}: Props) => {
  const [showModal, setShowModal] = useState(false)

  const onSubmit = async (values: FormValues) => {
    let filter: UploadFilter
    switch (values.type.value) {
      case "tagIsPresent":
        filter = {
          tagIsPresent: values.tagIsPresent || false,
        }
        break
      case "state":
        filter = {
          state: values.state.map(s => s.value as UploadState),
        }
        break
      case "createdBefore":
        filter = {
          createdBefore: values.createdBefore!,
        }
        break
      case "createdAfter":
        filter = {
          createdAfter: values.createdAfter!,
        }
        break
      case "depositAvailable":
        filter = {
          depositAvailable: values.depositAvailable || false,
        }
        break
      case "rewardAvailable":
        filter = {
          rewardAvailable: values.rewardAvailable || false,
        }
        break
      default:
        throw new Error(`Unknown filter type: ${values.type.value}`)
    }
    addFilter(filter)
    setShowModal(false)
  }

  const typeOptions = useMemo<SelectOption[]>(() => {
    const keys: (keyof UploadFilter)[] = [
      "tagIsPresent",
      "state",
      "createdBefore",
      "createdBefore",
      "depositAvailable",
      "rewardAvailable",
    ]

    return keys.map(key => ({
      label: keyToLabel(key),
      value: key,
    }))
  }, [])


  const initialValues = useMemo<Partial<FormValues>>(() => ({
    type: typeOptions[0],
    state: [],
  }), [typeOptions])

  return (
    <>
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowModal(true)}>
        <Plus/> Add filter
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add advanced filter</Modal.Title>
        </Modal.Header>
        <Form<FormValues>
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="vstack gap-3">
                <SelectAutocompleteField name="type" label="Type" options={typeOptions} />
                {values.type.value === "tagIsPresent" && (
                  <CheckboxField name="tagIsPresent" label="Tag is present" />
                )}
                {values.type.value === "state" && (
                  <SelectAutocompleteField name="state" label="State" options={uploadStateOptions} />
                )}
                {values.type.value === "createdBefore" && (
                  <TextField type="date" name="createdBefore" label="Created before" isRequired />
                )}
                {values.type.value === "createdAfter" && (
                  <TextField type="date" name="createdAfter" label="Created before" isRequired />
                )}
                {values.type.value === "depositAvailable" && (
                  <CheckboxField name="depositAvailable" label="Deposit available" />
                )}
                {values.type.value === "rewardAvailable" && (
                  <CheckboxField name="rewardAvailable" label="Reward available" />
                )}
              </Modal.Body>
              <Modal.Footer>
                <button type="submit" className="btn btn-primary">Select</button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    </>
  )
}

export default AdvancedFilterButton
