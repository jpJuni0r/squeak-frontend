import React, {useMemo} from "react"
import {SelectOption} from "@/components/form/select-field";
import {DepositFilter, DepositsQuery} from "@/model/generated/graphql";
import {Form} from "react-final-form";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import TextField from "@/components/form/text-field";
import {keyToLabel} from "@/components/admin/deposits/deposit-filter-tag";

interface Props {
  lectures: DepositsQuery["lectures"]
  addFilter: (filter: DepositFilter) => void
}

interface FormValues {
  type: SelectOption,
  lectureIds: SelectOption[]
  createdBefore?: string
  createdAfter?: string
}


const AdvancedFilterForm = ({lectures, addFilter}: Props) => {
  const onSubmit = async (values: FormValues) => {
    const filter: DepositFilter = {}
    switch (values.type.value) {
      case "lectureIds":
        filter.lectureIds = values.lectureIds!.map(o => o.value)
        break
      case "createdBefore":
        filter.createdBefore = values.createdBefore!
        break
      case "createdAfter":
        filter.createdAfter = values.createdAfter!
        break
      default:
        throw new Error(`Unknown filter type: ${values.type.value}`)
    }
    addFilter(filter)
  }

  const typeOptions: SelectOption[] = useMemo<SelectOption[]>(() => {
    const keys: (keyof DepositFilter)[] = [
      "lectureIds",
      "createdBefore",
      "createdAfter"
    ]

    return keys.map(key => ({
      label: keyToLabel(key),
      value: key,
    }))
  }, [])

  const lectureOptions = useMemo(() =>
      lectures.map(l => ({
        label: l.displayName,
        value: l.id
      })),
    [lectures])

  const initialValues = useMemo<FormValues>(() => ({
    type: typeOptions[0],
    lectureIds: [],
  }), [typeOptions])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, values}) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body vstack gap-3">
            <SelectAutocompleteField name="type" label="Type" options={typeOptions}/>
            {values.type.value === "lectureIds" && (
              <SelectAutocompleteField name="lectureIds" label="Lectures" options={lectureOptions} isMulti isRequired/>
            )}
            {values.type.value === "createdBefore" && (
              <TextField type="date" name="createdBefore" label="Created before" isRequired/>
            )}
            {values.type.value === "createdAfter" && (
              <TextField type="date" name="createdAfter" label="Created after" isRequired/>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default AdvancedFilterForm
