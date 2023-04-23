import React from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import FacultiesListComponent from "@/components/admin/faculty/faculties-list-component";

const facultiesQuery = gql(`
query faculties {
    faculties {
        id
        displayName
    }
}
`)

const FacultiesListContainer = () => {
  const { data, loading, error } = useQuery(facultiesQuery)

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <FacultiesListComponent faculties={data!.faculties} />
  )
}

export default FacultiesListContainer
