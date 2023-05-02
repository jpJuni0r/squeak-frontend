import React, {useContext, useMemo} from "react";
import {SelectOption} from "@/components/form/select-field";
import {DepositsQuery} from "@/model/generated/graphql";
import {Form} from "react-final-form";
import TextField from "@/components/form/text-field";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import {SiteConfigurationContext} from "@/context/site-configuration";

interface Props {
  defaultValues?: Partial<DepositFormValues>
  lectures: DepositsQuery["lectures"]
  onSubmit: (values: DepositFormValues) => void
  showAccountingPositionField?: boolean
}

export interface DepositFormValues {
  tag?: string,
  lectures: SelectOption[],
  comment?: string,
  accountingPosition?: SelectOption,
}

const DepositForm = ({defaultValues, lectures, showAccountingPositionField, onSubmit}: Props) => {
  const siteConfiguration = useContext(SiteConfigurationContext)
  const initialValues = useMemo(() => ({
    lectures: [],
    ...defaultValues,
  }), [defaultValues])
  const lectureOptions = useMemo(() =>
      lectures.map(l => ({label: l.displayName, value: l.id})),
    [lectures])
  const accountingPositionOptions = useMemo<SelectOption[]>(() =>
    siteConfiguration.printers.flatMap(p =>
      p.accountingPositions.map(a => ({ label: a.name, value: a.id}))
    ), [siteConfiguration])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({handleSubmit, submitting, submitError}) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-body vstack gap-3">
            <TextField name="tag" label="Tag" isRequired/>
            <SelectAutocompleteField name="lectures" label="Lectures" options={lectureOptions} isMulti isRequired />
            <TextField name="comment" label="Comment" />
            {showAccountingPositionField && (
              <SelectAutocompleteField name="accountingPosition" label="Accounting position" options={accountingPositionOptions} isRequired/>
            )}
            {submitError && <div className="text-danger">{submitError}</div>}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default DepositForm

