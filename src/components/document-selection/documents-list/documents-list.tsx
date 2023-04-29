import React, {Dispatch, ReducerAction} from "react"
import {DocumentFilter, DocumentsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import Spinner from "@/components/spinner/spinner";
import DocumentsListComponent from "@/components/document-selection/documents-list/documents-list-component";
import {useQuery} from "@apollo/client";
import {DocumentSelectionState, documentsSelectionReducer} from "@/hooks/documents-selection";

interface Props {
  filters: DocumentFilter[],
  documentSelectionState: DocumentSelectionState<DocumentsQuery["documents"]["results"][0]>,
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
}

export const documentsQuery = gql(`
query documents($filters: [DocumentFilter!]!) {
  documents(filters: $filters, count: 10) {
    results {
      __typename
      id
      date
      semester
      public
      publicComment
      publishedOn
      downloadable
      rating
      numPages
      validated
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
}`)

const DocumentsListContainer = ({filters, documentSelectionState, documentSelectionDispatcher}: Props) => {
  const { data, loading, error } = useQuery(documentsQuery, {
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
        documentSelectionState={documentSelectionState}
        documentSelectionDispatcher={documentSelectionDispatcher}
      />
    )
  }
}

export default DocumentsListContainer
