import React from "react"
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import {DocumentFilter, FilterMetaQuery} from "@/model/generated/graphql";
import {DocumentsListContainer} from "@/components/admin/documents/documents-list/documents-list";
import {useFilters} from "@/hooks/filters";


interface Props {
  allLectures: FilterMetaQuery["lectures"],
  allExaminers: FilterMetaQuery["examiners"],
  faculties: FilterMetaQuery["faculties"],
}

const DocumentsAdminComponent = ({allLectures, allExaminers, faculties}: Props) => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useFilters<DocumentFilter>()

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
