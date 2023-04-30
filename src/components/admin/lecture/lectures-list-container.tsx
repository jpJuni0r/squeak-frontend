import React from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import LecturesListComponent from "@/components/admin/lecture/lectures-list-component";

const lecturesQuery = gql(`
query lectures(
  $validated: Boolean
) {
  lectures(
    validated: $validated
  ) {
    id
    displayName
    validated
    aliases
    comment
    faculty {
      id
      displayName
    }
    availableRewards
  }
  faculties {
    id
    displayName
  }
}
`)

const LecturesListContainer = () => {
  const { data, loading, error, refetch } = useQuery(lecturesQuery, {
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
    <LecturesListComponent lectures={data!.lectures} faculties={data!.faculties} refresh={refetch} />
  )
}

export default LecturesListContainer
