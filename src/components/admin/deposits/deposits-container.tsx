import React, {useState} from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import {DepositFilter} from "@/model/generated/graphql";
import Spinner from "@/components/spinner/spinner";
import DepositsComponent from "@/components/admin/deposits/deposits-component";
import {useFilters} from "@/hooks/filters";

const depositsQuery = gql(`
query deposits(
  $filters: [DepositFilter!]!
) {
  deposits(filters: $filters) {
    results {
      id
      tag
      created
      value
      comment
      lectures {
        id
        displayName
      }
    }
  }
  lectures {
    id
    displayName
  }
}
`)

const DepositsContainer = () => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useFilters<DepositFilter>()
  const {data, loading, error, previousData, refetch} = useQuery(depositsQuery, {
    variables: {
      filters: combinedFilters,
    }
  })

  if (loading && !previousData) {
    return <Spinner/>
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <DepositsComponent
      deposits={data?.deposits || previousData!.deposits}
      lectures={data?.lectures || previousData!.lectures}
      setFilters={setFilters}
      setAdvancedFilters={setAdvancedFilters}
      refetch={refetch}
    />
  )
}

export default DepositsContainer
