import React, {useCallback, useMemo, useState} from "react"
import {DocumentFilter, DocumentsQuery, Examiner, Lecture} from "@/model/generated/graphql";
import DocumentsListContainer from "@/components/document-selection/documents-list/documents-list";
import Cart from "@/components/document-selection/cart/cart";
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import advancedFilter from "@/components/document-selection/document-filter/advanced-filter";

interface Props {
  allLectures: Lecture[],
  allExaminers: Examiner[],
}

const defaultFilter: DocumentFilter = {
  public: true
}

const DocumentSelectionComponent = ({allLectures, allExaminers}: Props) => {
  const [filters, setFilters] = useState<DocumentFilter[]>([])
  const [advancedFilters, setAdvancedFilters] = useState<DocumentFilter[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentsQuery["documents"]["results"]>([]);
  const clearDocuments = useCallback(() => setSelectedDocuments([]), [setSelectedDocuments])

  const combinedFilters = useMemo(() => {
      // We need to clear the clientId field from the AdvancedFilterItem type
    const sanitizedAdvancedFilters = advancedFilters
      .map(f => ({
        ...f,
        clientId: undefined,
      }))
    return [
      defaultFilter,
      ...filters,
      ...sanitizedAdvancedFilters,
    ]
  },
  [filters, advancedFilters]
)

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
