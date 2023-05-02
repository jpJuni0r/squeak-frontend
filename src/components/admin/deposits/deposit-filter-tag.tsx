import React from "react"
import {DepositFilter} from "@/model/generated/graphql";
import {X} from "react-bootstrap-icons";

interface Props {
  filter: DepositFilterItem
  removeFilter: () => void
}

export interface DepositFilterItem extends DepositFilter {
  // this is a client-only field and required to render lists in React
  clientId: number;
}

export const keyToLabel = (key: string) => {
  switch (key) {
    case "lectureIds":
      return "Lectures"
    case "createdBefore":
      return "Created before"
    case "createdAfter":
      return "Created after"
    default:
      throw new Error(`Unknown key: ${key}`)
  }
}

const DepositFilterTag = ({filter, removeFilter}: Props) => {
  const key = Object.keys(filter)
    .filter(key => key !== "clientId")[0] as keyof DepositFilter

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

export default DepositFilterTag
