import React from "react"
import {FieldSemantics} from "@/components/document-selection/document-filter/advanced-filter-modal";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import TextField from "@/components/form/text-field";
import {SelectOption} from "@/components/form/select-field";

interface Props {
  name: string;
  semantics: FieldSemantics,
}

const AdvancedFilterValue = ({ name, semantics }: Props) => {
  const label = "Value"
  switch (semantics.kind) {
    case "plain":
      return <TextField
        name={name}
        label={label}
      />
    case "boolean": {
      return <SelectAutocompleteField
        name={name}
        label={label}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />
    }
    case "date":
      return <TextField
        type="date"
        name={name}
        label={label}
      />
    case "enum":
      return <SelectAutocompleteField
        name={name}
        label={label}
        options={semantics.options}
      />
    case "semester":
      const minYear = 2015
      const currentYear = new Date().getUTCFullYear()
      const listOfYears = new Array(currentYear - minYear + 1).fill(null)
        .map((_, index) => minYear + index)
      const options: SelectOption[] = listOfYears
        .map(year => [{
          label: `SS ${year}`,
          value: `WS ${year}`,
        }])
        .flat()
        .reverse()

      return <SelectAutocompleteField
        name={name}
        label={label}
        options={options}
      />
    default:
      // @ts-ignore
      return <div className="text-danger">Unknown kind: {semantics.kind}</div>
  }
}

export default AdvancedFilterValue
