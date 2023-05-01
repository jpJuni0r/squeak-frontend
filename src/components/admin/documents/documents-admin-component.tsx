import React from "react"
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import {Examiner, FilterMetaQuery, Lecture} from "@/model/generated/graphql";
import {useDocumentsFilter} from "@/hooks/documents-filter";
import {DocumentsListContainer} from "@/components/admin/documents/documents-list/documents-list";


interface Props {
  allLectures: FilterMetaQuery["lectures"],
  allExaminers: FilterMetaQuery["examiners"],
  faculties: FilterMetaQuery["faculties"],
}

const DocumentsAdminComponent = ({allLectures, allExaminers, faculties}: Props) => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useDocumentsFilter()

  return (
    <div className="vstack gap-3">
      <DocumentFilterForm
        setFilters={setFilters}
        setAdvancedFilters={setAdvancedFilters}
        allExaminers={allExaminers}
        allLectures={allLectures}
        faculties={faculties}
      />
      <DocumentsListContainer filters={combinedFilters} />
    </div>
  )
}

export default DocumentsAdminComponent
