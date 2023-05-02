import {useCallback, useMemo, useReducer} from "react";

type State<Filter> = {
  filters: Filter[],
  advancedFilters: Filter[],
  combinedFilters: Filter[],
}

type Action<Filter> =
  | { type: "set_filters", filters: Filter[] }
  | { type: "set_advanced_filters", advancedFilters: Filter[] }

type Reducer<Filter> = (prevState: State<Filter>, action: Action<Filter>) => State<Filter>

// We need to clear the clientId field from the AdvancedFilterItem type
const removeClientIdProperty = <Filter>(filter: Filter): Filter => {
  return {
    ...filter,
    clientId: undefined,
  }
}

const reducer = <Filter>(state: State<Filter>, action: Action<Filter>): State<Filter> => {
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

/**
 * This hook is useful for state management regarding queries that have advanced filters. It's dived into two parts:
 * It's possible to set a basic and advanced filter. The combination of those is part of the reducer state and
 * is directly usable as a GraphQL query variable.
 *
 * The reason for a two-fold divide between the filter lists is because it helps if the UI is also dived into two parts
 * where setting filters is possible.
 */
export const useFilters = <Filter>() => {
  const initialState = useMemo<State<Filter>>(() => ({
    filters: [],
    advancedFilters: [],
    combinedFilters: [],
  }), [])

  const [state, dispatch] = useReducer<Reducer<Filter>>(reducer, initialState)

  const setFilters = useCallback((filters: Filter[]) => {
    dispatch({
      type: "set_filters",
      filters,
    })
  }, [dispatch])

  const setAdvancedFilters = useCallback((advancedFilters: Filter[]) => {
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
