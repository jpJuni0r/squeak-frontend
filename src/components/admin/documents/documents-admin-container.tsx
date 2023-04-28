import React from "react"
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DocumentsAdminComponent from "@/components/admin/documents/documents-admin-component";
import {filterMetaQuery} from "@/components/document-selection/document-selection";

const DocumentsAdminContainer = () =>  {
  const { data, loading, error } = useQuery(filterMetaQuery)
  
  if (loading) {
    return <Spinner/>
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }
  
  return (
    <DocumentsAdminComponent
      allLectures={data!.lectures}
      allExaminers={data!.examiners}
    />
  )
}

export default DocumentsAdminContainer
