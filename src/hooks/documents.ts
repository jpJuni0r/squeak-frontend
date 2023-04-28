import {useCallback, useReducer} from "react";
import {DocumentFilter} from "@/model/generated/graphql";

type State = {
  filters: DocumentFilter[],
  advancedFilters: DocumentFilter[],
  combinedFilters: DocumentFilter[],
}

type Action =
  | { type: "set_filters", filters: DocumentFilter[] }
  | { type: "set_advanced_filters", advancedFilters: DocumentFilter[] }

// We need to clear the clientId field from the AdvancedFilterItem type
const removeClientIdProperty = (filter: DocumentFilter) => {
  return {
    ...filter,
    clientId: undefined,
  }
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set_filters":
      return {
        ...state,
        filters: action.filters,
        combinedFilters: [
          ...action.filters,
          ...state.advancedFilters,
        ].map(removeClientIdProperty),
      }
    case "set_advanced_filters":
      return {
        ...state,
        advancedFilters: action.advancedFilters,
        combinedFilters: [
          ...state.filters,
          ...action.advancedFilters,
        ].map(removeClientIdProperty),
      }
    default:
      throw new Error("unknown action")
  }
}

const initialState: State = {
  filters: [],
  advancedFilters: [],
  combinedFilters: [],
}

export const useDocumentsFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setFilters = useCallback((filters: DocumentFilter[]) => {
    dispatch({
      type: "set_filters",
      filters,
    })
  }, [dispatch])

  const setAdvancedFilters = useCallback((advancedFilters: DocumentFilter[]) => {
    dispatch({
      type: "set_advanced_filters",
      advancedFilters,
    })
  }, [dispatch])


  return {
    combinedFilters: state.combinedFilters,
    setFilters,
    setAdvancedFilters,
  }
}
