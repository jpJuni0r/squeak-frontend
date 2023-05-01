import React, {useCallback} from "react"
import {DocumentFilter, Examiner, FilterMetaQuery, Lecture} from "@/model/generated/graphql";
import SearchField from "@/components/document-selection/document-filter/search-field";
import AdvancedFilter from "@/components/document-selection/document-filter/advanced-filter";

interface Props {
  setFilters: (filters: DocumentFilter[]) => void;
  setAdvancedFilters: (filters: DocumentFilter[]) => void;
  allExaminers: FilterMetaQuery["examiners"];
  allLectures: FilterMetaQuery["lectures"];
  faculties: FilterMetaQuery["faculties"];
}

const DocumentFilterForm = ({ setFilters, setAdvancedFilters, allExaminers, allLectures, faculties} : Props) => {
  const setSearchSelection = useCallback((searchSelection: (Lecture|Examiner)[]) => {
      const filters: DocumentFilter[] = []
      const examiners = searchSelection.filter(o => o.__typename === "Examiner")
      const lectures = searchSelection.filter(o => o.__typename === "Lecture")

      if (examiners.length) {
        filters.push({
          examinerIds: examiners.map(e => e.id),
        })
      }
      if (lectures.length) {
        filters.push({
          lectureIds: lectures.map(l => l.id),
        })
      }

      setFilters(filters);
  }, [setFilters])

  return (
    <div className="vstack gap-1">
      <SearchField allExaminers={allExaminers} allLectures={allLectures} onChange={setSearchSelection} />
      <AdvancedFilter setAdvancedFilters={setAdvancedFilters} faculties={faculties} />
    </div>
  )
}

export default DocumentFilterForm
