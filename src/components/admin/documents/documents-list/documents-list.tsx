import React from "react"
import {DocumentFilter} from "@/model/generated/graphql";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import DocumentsListComponent from "@/components/admin/documents/documents-list/documents-list-component";
import {gql} from "@/model/generated";

interface Props {
  filters: DocumentFilter[],
}

const adminDocumentsQuery = gql(`
query adminDocuments($filters: [DocumentFilter!]!) {
  documents(filters: $filters, count: 10) {
    results {
      __typename
      id
      date
      semester
      public
      publicComment
      internalComment
      publishedOn
      downloadable
      rating
      numPages
      examiners {
        id
        name
        displayName
      }
      lectures {
        id
        displayName
      }
      ... on WrittenExam {
        solution
      }
    }
    cursor
    totalAvailable
  }
}
`)


export const DocumentsListContainer = ({ filters }: Props) => {
  const { data, loading, error, refetch } = useQuery(adminDocumentsQuery, {
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
