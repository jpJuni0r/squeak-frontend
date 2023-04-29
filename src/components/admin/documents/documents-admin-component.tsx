import React from "react"
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import {Examiner, Lecture} from "@/model/generated/graphql";
import {useDocumentsFilter} from "@/hooks/documents-filter";
import {DocumentsListContainer} from "@/components/admin/documents/documents-list/documents-list";


interface Props {
  allLectures: Lecture[],
  allExaminers: Examiner[],
}

const DocumentsAdminComponent = ({allLectures, allExaminers}: Props) => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useDocumentsFilter()

  return (
    <div className="vstack gap-3">
      <DocumentFilterForm
        setFilters={setFilters}
        setAdvancedFilters={setAdvancedFilters}
        allExaminers={allExaminers}
        allLectures={allLectures}
      />
      <DocumentsListContainer filters={combinedFilters} />
    </div>
  )
}

export default DocumentsAdminComponent
