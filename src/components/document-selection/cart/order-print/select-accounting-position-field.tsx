import React, {useContext} from "react"
import {SiteConfigurationContext} from "@/context/site-configuration";
import SelectField from "@/components/form/select-field";

interface Props {
  name: string
  label: string;
  selectedPrinterId?: string
}

const SelectAccountingPositionField = ({ name, label, selectedPrinterId}: Props) => {
  const context = useContext(SiteConfigurationContext)

  const printer = context.printers
    .find(p => p.id === selectedPrinterId)

  if (!printer) {
    return null
  }

  return (
    <SelectField
      name={name}
      label={label}
      options={printer.accountingPositions.map(p => ({
        label: p.name,
        value: p.id,
      }))}
    />
  )
}

export default SelectAccountingPositionField
