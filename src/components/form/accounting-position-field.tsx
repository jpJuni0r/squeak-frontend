import React, {useContext, useMemo} from "react"
import {SiteConfigurationContext} from "@/context/site-configuration";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";

interface Props {
  name: string
}

export const useAccountingPositionOptions = () => {
  const siteConfiguration = useContext(SiteConfigurationContext);

  return useMemo(() =>
    siteConfiguration.printers.flatMap(p =>
      p.accountingPositions
        .map(a => ({label: a.name, value: a.id}))
    ), [siteConfiguration])
}

const AccountingPositionField = ({name}: Props) => {
  const accountingPositionOptions = useAccountingPositionOptions()

  const defaultValue = useMemo(() => accountingPositionOptions[0], [accountingPositionOptions])

  return (
    <SelectAutocompleteField
      name={name}
      label="Accounting position"
      options={accountingPositionOptions}
      defaultValue={defaultValue}
    />
  )
}

export default AccountingPositionField
