import React from "react"
import {DocumentFilter} from "@/model/generated/graphql";
import {useQuery} from "@apollo/client";
import {documentsQuery} from "@/components/document-selection/documents-list/documents-list";
import Spinner from "@/components/spinner/spinner";
import DocumentsListComponent from "@/components/admin/documents/documents-list/documents-list-component";

interface Props {
  filters: DocumentFilter[],
}

export const DocumentsListContainer = ({ filters }: Props) => {
  const { data, loading, error, refetch } = useQuery(documentsQuery, {
    variables: {
      filters,
    },
  })

  if (loading) {
    return <Spinner />
  } else if (error) {
    return <p className="text-danger">{error.message}</p>
  } else {
    return (
      <DocumentsListComponent
        documents={data!.documents}
        refetch={refetch}
      />
    )
  }
}
