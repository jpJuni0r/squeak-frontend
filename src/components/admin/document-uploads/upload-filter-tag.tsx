import React, {Dispatch, SetStateAction} from "react"
import {UploadFilter} from "@/model/generated/graphql";
import {X} from "react-bootstrap-icons";

interface Props {
  filter: UploadFilterItem
  setFilters: Dispatch<SetStateAction<UploadFilterItem[]>>
}

export interface UploadFilterItem extends UploadFilter {
  // this is a client-only field and required to render lists in React
  clientId: number;
}

export const keyToLabel = (key: keyof UploadFilter) => {
  switch (key) {
    case "tagIsPresent":
      return "Tag is present"
    case "state":
      return "State"
    case "createdBefore":
      return "Created before"
    case "createdAfter":
      return "Created after"
    case "depositAvailable":
      return "Deposit available"
    case "rewardAvailable":
      return "Reward available"
    default:
      throw new Error(`Received unknown key to translate to a label: ${key}`)
  }
}

const UploadFilterTag = ({filter, setFilters}: Props) => {
  const removeFilter = () => {
    setFilters(f => f.filter(f => f.clientId !== filter.clientId))
  }

  const key = Object.keys(filter)
    .filter(key => key !== "clientId")[0] as keyof UploadFilter

  const label = keyToLabel(key)

  return (
    <button type="button" className="btn badge bg-light text-secondary" onClick={removeFilter}>
      {label}

      <span className="ms-1">
        <X/>
      </span>
    </button>
  )
}

export default UploadFilterTag
