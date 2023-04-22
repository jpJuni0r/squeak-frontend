import React, {useCallback, useState} from "react";
import {DocumentFilter, DocumentsQuery} from "@/model/generated/graphql";
import DocumentsListContainer from "@/components/document-selection/documents-list/documents-list";
import Cart from "@/components/document-selection/cart/cart";

const defaultFilter: DocumentFilter = {
  public: true
}

const DocumentSelection = () => {
  const [filter, setFilter] = useState([defaultFilter])
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentsQuery["documents"]["results"]>([]);
  const clearDocuments = useCallback(() => setSelectedDocuments([]), [setSelectedDocuments])

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-8">
          <DocumentsListContainer
            filters={filter}
            selectedDocuments={selectedDocuments}
            setSelectedDocuments={setSelectedDocuments}
          />
        </div>
        <div className="col-md-4">
          <Cart selectedDocuments={selectedDocuments} clearDocuments={clearDocuments}/>
        </div>
      </div>
    </div>
  )
}

export default DocumentSelection
