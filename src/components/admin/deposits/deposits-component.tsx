import React, {useState} from "react"
import {DepositFilter, DepositsQuery} from "@/model/generated/graphql";
import DepositFilterForm from "@/components/admin/deposits/deposit-filter-form";
import DepositsList from "@/components/admin/deposits/deposits-list";
import AddDepositButton from "@/components/admin/deposits/add-deposit-button";

interface Props {
  deposits: DepositsQuery["deposits"],
  lectures: DepositsQuery["lectures"],
  setFilters: (filters: DepositFilter[]) => void,
  setAdvancedFilters: (advancedFilters: DepositFilter[]) => void,
  refetch: () => void
}

const DepositsComponent = ({deposits, lectures, setFilters, setAdvancedFilters, refetch}: Props) => {
  return (
    <div className="vstack gap-3">
      <DepositFilterForm
        setFilters={setFilters}
        setAdvancedFilters={setAdvancedFilters}
        lectures={lectures}
      />
      <div>
        <AddDepositButton lectures={lectures} refresh={refetch}/>
      </div>
      <DepositsList deposits={deposits.results} lectures={lectures}/>
    </div>
  )
}

export default DepositsComponent
