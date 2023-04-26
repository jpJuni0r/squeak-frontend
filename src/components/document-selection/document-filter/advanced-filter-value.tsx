import React from "react"
import {FieldSemantics} from "@/components/document-selection/document-filter/advanced-filter-modal";
import SelectAutocompleteField from "@/components/form/select-autocomplete-field";
import TextField from "@/components/form/text-field";
import {semesterOptions} from "@/shared/enum-select-options";

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
      return <SelectAutocompleteField name={name} label={label} options={semesterOptions}/>
    default:
      // @ts-ignore
      return <div className="text-danger">Unknown kind: {semantics.kind}</div>
  }
}

export default AdvancedFilterValue
