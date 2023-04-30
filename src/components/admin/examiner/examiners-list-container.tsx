import React from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import ExaminersListComponent from "@/components/admin/examiner/examiners-list-component";

const examinersQuery = gql(`
query examiners(
  $validated: Boolean
) {
  examiners(
    validated: $validated
  ) {
    id
    name
    validated
    displayName
    name
    prename
    institute 
  }
}
`)

const ExaminersListContainer = () => {
  const { data, loading, error, refetch } = useQuery(examinersQuery, {
    variables: {
      validated: null,
    },
  })

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <ExaminersListComponent examiners={data!.examiners} refresh={refetch}/>
  )
}

export default ExaminersListContainer
