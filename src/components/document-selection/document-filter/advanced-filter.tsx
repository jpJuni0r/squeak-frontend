import React, {useState} from "react"
import {Plus} from "react-bootstrap-icons";
import {DocumentFilter} from "@/model/generated/graphql";
import AdvancedFilterModal from "@/components/document-selection/document-filter/advanced-filter-modal";
import AdvancedFilterTag, {
  AdvancedFilterItem
} from "@/components/document-selection/document-filter/advanced-filter-tag";

interface Props {
  setAdvancedFilters: (filters: DocumentFilter[]) => void
}

const AdvancedFilter = ({ setAdvancedFilters }: Props) => {
  const [filters, setFilters] = useState<AdvancedFilterItem[]>([])
  const [show, setShow] = useState(false)

  const hideModal = (filter?: DocumentFilter) => {
    setShow(false)
    if (filter) {
      const newFilters = [
        ...filters,
        {
          ...filter,
          clientId: Number(new Date()),
        }
      ]
      setFilters(newFilters)
      setAdvancedFilters(newFilters)
    }
  }

  const removeFilter = (filter: AdvancedFilterItem) => {
    const newFilters = filters.filter(f => f.clientId !== filter.clientId)
    setFilters(newFilters)
    setAdvancedFilters(newFilters)
  }

  return (
    <div>
      <div className="hstack gap-1">
        {filters.map((filter) => (
          <AdvancedFilterTag filter={filter} remove={removeFilter} key={filter.clientId} />
        ))}
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setShow(true)}>
          <Plus /> Filter
        </button>
      </div>
      <AdvancedFilterModal show={show} hideModal={hideModal}/>
    </div>
  )
}

export default AdvancedFilter
