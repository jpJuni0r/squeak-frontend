import React, {MouseEventHandler} from "react"
import {DocumentFilter} from "@/model/generated/graphql";
import {X} from "react-bootstrap-icons";
import {keyToLabel} from "@/components/document-selection/document-filter/advanced-filter-modal";

interface Props {
  filter: AdvancedFilterItem,
  remove: (filter: AdvancedFilterItem) => void;
}

export interface AdvancedFilterItem extends DocumentFilter {
  // this is a client-only field and required to render lists
  clientId: number;
}

const AdvancedFilterTag = ({ filter, remove }: Props) => {
  const key = Object.keys(filter)
    .filter(key => key !== "clientId")
    .find(key => {
      // @ts-ignore
      const value = filter[key]
      return value !== null && value !== undefined
    })!

  const label = keyToLabel(key)

  const onClick: MouseEventHandler<unknown> = (event) => {
    event.preventDefault()
    remove(filter)
  }

  return (
    <button type="button" className="btn badge bg-light text-secondary" onClick={onClick}>
      {label}

      <span className="ms-1">
        <X />
      </span>
    </button>
  )
}

export default AdvancedFilterTag
