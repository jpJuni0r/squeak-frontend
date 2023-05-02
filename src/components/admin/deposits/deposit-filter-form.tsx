import React, {useCallback, useEffect, useState} from "react"
import {DepositFilter, DepositsQuery} from "@/model/generated/graphql";
import {Plus} from "react-bootstrap-icons";
import AddAdvancedFilterButton from "@/components/admin/deposits/add-advanced-filter-button";
import addAdvancedFilterButton from "@/components/admin/deposits/add-advanced-filter-button";
import DepositFilterTag, {DepositFilterItem} from "@/components/admin/deposits/deposit-filter-tag";

interface Props {
  lectures: DepositsQuery["lectures"]
  setFilters: (filters: DepositFilter[]) => void,
  setAdvancedFilters: (advancedFilters: DepositFilter[]) => void,
}

const DepositFilterForm = ({lectures, setFilters, setAdvancedFilters}: Props) => {
  const [value, setValue] = useState("")
  const [internalAdvancedFilters, setInternalAdvancedFilters] = useState<DepositFilterItem[]>([])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
    if (value) {
      setFilters([{
        tag: value,
      }])
    } else {
      setFilters([])
    }
  }, [setValue, setFilters])

  useEffect(() => {
    setAdvancedFilters(internalAdvancedFilters)
  }, [internalAdvancedFilters, setAdvancedFilters])

  return (
    <div className="vstack gap-1">
      <div>
        <input type="text" className="form-control" placeholder="Search for tag..." value={value} onChange={onChange} />
      </div>
      <div>
        {internalAdvancedFilters.map(filter => (
          <DepositFilterTag
            filter={filter}
            removeFilter={() =>
              setInternalAdvancedFilters(filters => filters.filter(f => f.clientId !== filter.clientId))
            }
            key={filter.clientId}
          />
        ))}
        <AddAdvancedFilterButton
          lectures={lectures}
          addFilter={filter => {
            setInternalAdvancedFilters(filters => ([
              ...filters,
              {
                ...filter,
                clientId: Number(new Date()),
              },
            ]))
          }}
        />
      </div>
    </div>
  )
}

export default DepositFilterForm
