import React, {useEffect} from "react"
import {DocumentFilter, DocumentsQuery, FilterMetaQuery} from "@/model/generated/graphql";
import DocumentsListContainer from "@/components/document-selection/documents-list/documents-list";
import Cart from "@/components/document-selection/cart/cart";
import DocumentFilterForm from "@/components/document-selection/document-filter/document-filter-form";
import {useFilters} from "@/hooks/filters";
import {useDocumentsSelection} from "@/hooks/documents-selection";

interface Props {
  allLectures: FilterMetaQuery["lectures"]
  allExaminers: FilterMetaQuery["examiners"]
  faculties: FilterMetaQuery["faculties"]
}

const DocumentSelectionComponent = ({allLectures, allExaminers, faculties}: Props) => {
  const {combinedFilters, setFilters, setAdvancedFilters} = useFilters<DocumentFilter>()
  const [state, dispatch] = useDocumentsSelection<DocumentsQuery["documents"]["results"][0]>()

  useEffect(() => {
    const downListener = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        dispatch({ type: "shift_down"})
      }
    }
    const upListener = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        dispatch({ type: "shift_up"})
      }
    }

    document.addEventListener("keydown", downListener)
    document.addEventListener("keyup", upListener)

    return () => {
      document.removeEventListener("keydown", downListener)
      document.removeEventListener("keyup", upListener)
    }
  }, [dispatch])

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-md-8">
          <DocumentFilterForm
            setFilters={setFilters}
            setAdvancedFilters={setAdvancedFilters}
            allExaminers={allExaminers}
            allLectures={allLectures}
            faculties={faculties}
          />
          <hr/>
          <DocumentsListContainer
            filters={combinedFilters}
            documentSelectionState={state}
            documentSelectionDispatcher={dispatch}
          />
        </div>
        <div className="col-md-4">
          <Cart
            documentSelectionState={state}
            documentSelectionDispatcher={dispatch}
          />
        </div>
      </div>
    </div>
  )
}

export default DocumentSelectionComponent
