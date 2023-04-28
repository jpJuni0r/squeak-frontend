import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import DocumentEditFormComponent from "@/components/admin/documents/documents-list/document-edit-form-component";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";

interface Props {
  doc: DocumentsQuery["documents"]["results"][0]
  refetchAndCloseModal: () => void
}

const editDocumentMeta = gql(`
query editDocumentMeta {
  lectures {
    id
    displayName
  }
  examiners{
    id
    displayName
  }
}
`)

const DocumentEditFormContainer = ({doc, refetchAndCloseModal}: Props) => {
  const {data, loading, error, refetch} = useQuery(editDocumentMeta)

  if (loading) {
    return <Spinner/>
  } else if (error) {
    return (
      <div className="text-danger">{error.message}</div>
    )
  }

  return (
    <DocumentEditFormComponent
      doc={doc}
      lectures={data!.lectures}
      examiners={data!.examiners}
      refetchAndCloseModal={refetchAndCloseModal}
    />
  )
}

export default DocumentEditFormContainer
