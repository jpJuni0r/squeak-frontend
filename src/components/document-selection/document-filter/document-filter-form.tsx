import React, {Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState} from "react"
import {Form} from "react-final-form";
import {FormState} from "final-form";
import {DocumentFilter, Examiner, Lecture} from "@/model/generated/graphql";
import SearchField from "@/components/document-selection/document-filter/search-field";
import AdvancedFilter from "@/components/document-selection/document-filter/advanced-filter";

interface Props {
  setFilters: Dispatch<SetStateAction<DocumentFilter[]>>
  setAdvancedFilters: Dispatch<SetStateAction<DocumentFilter[]>>
  allExaminers: Examiner[];
  allLectures: Lecture[];
}

const DocumentFilterForm = ({ setFilters, setAdvancedFilters, allExaminers, allLectures} : Props) => {
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
      <AdvancedFilter setAdvancedFilters={setAdvancedFilters} />
    </div>
  )
}

export default DocumentFilterForm
