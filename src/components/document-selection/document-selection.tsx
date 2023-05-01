import React from "react";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DocumentSelectionComponent from "@/components/document-selection/document-selection-component";

// This query is shared with the admin panel
export const filterMetaQuery = gql(`
query filterMeta(
  $validated: Boolean
) {
  examiners(validated: $validated) {
    id
    name
    validated
    prename
    institute
    displayName
  }
  lectures(validated: $validated) {
    id
    displayName
    validated
    comment
    aliases
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

const DocumentSelectionContainer = () => {
  const { data, loading, error } = useQuery(filterMetaQuery, {
    variables: {
      validated: true,
    }
  })

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return <DocumentSelectionComponent
    allLectures={data!.lectures}
    allExaminers={data!.examiners}
    faculties={data!.faculties}
  />
}

export default DocumentSelectionContainer
