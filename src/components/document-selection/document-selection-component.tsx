import React, {useCallback, useState} from "react"
import {DocumentsQuery, Examiner, Lecture} from "@/model/generated/graphql";
import DocumentsListContainer from "@/components/document-selection/documents-list/documents-list";
import Cart from "@/components/document-selection/cart/cart";
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import {useDocumentsFilter} from "@/hooks/documents";

interface Props {
  allLectures: Lecture[],
  allExaminers: Examiner[],
}

const DocumentSelectionComponent = ({allLectures, allExaminers}: Props) => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useDocumentsFilter()
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentsQuery["documents"]["results"]>([]);
  const clearDocuments = useCallback(() => setSelectedDocuments([]), [setSelectedDocuments])

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-8">
          <DocumentFilterForm
            setFilters={setFilters}
            setAdvancedFilters={setAdvancedFilters}
            allExaminers={allExaminers}
            allLectures={allLectures}
          />
          <hr/>
          <DocumentsListContainer
            filters={combinedFilters}
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

export default DocumentSelectionComponent
