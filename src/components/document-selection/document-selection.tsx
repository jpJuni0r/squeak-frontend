import React from "react";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DocumentSelectionComponent from "@/components/document-selection/document-selection-component";

const filterMetaQuery = gql(`
query filterMeta {
  examiners {
    id
    name
    validated
    prename
    institute
    displayName
  }
  lectures {
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
}
`)

const DocumentSelectionContainer = () => {
  const { data, loading, error } = useQuery(filterMetaQuery)

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return <DocumentSelectionComponent allLectures={data!.lectures} allExaminers={data!.examiners} />
}

export default DocumentSelectionContainer
