import React from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import ExaminersListComponent from "@/components/admin/examiner/examiners-list-component";

const examinersQuery = gql(`
query examiners {
  examiners {
    id
    name
    validated
    displayName
    institute 
  }
}
`)

const ExaminersListContainer = () => {
  const { data, loading, error } = useQuery(examinersQuery)

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <ExaminersListComponent examiners={data!.examiners} />
  )
}

export default ExaminersListContainer
