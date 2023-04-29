import {Dispatch, ReducerAction, useReducer} from "react";
import uniqBy from "lodash/uniqBy";

// When we talk about rows here, we always mean the rows index
export type DocumentSelectionState<D extends SimpleDocument> = {
  // These are the documents that are currently visible to the user. We need
  // those to get the documents for some given index range.
  documentsInView: D[],
  selectedDocuments: D[],
  lastClickedRow: number | null;
  cursorDocumentRow: number | null;
  shiftDown: boolean;
  // An inclusive interval of the document row indexes to highlight. The UI
  // will only show highlights when shiftDown is true.
  highlightedRows: [number, number],
}

type Action<D extends SimpleDocument> =
  | { type: "set_documents_in_view", documents: D[] }
  | { type: "add_document", row: number }
  | { type: "remove_document", row: number}
  | { type: "set_documents", documents: D[] }
  | { type: "click_row", row: number }
  | { type: "mouse_enter", row: number }
  | { type: "mouse_leave", row: number }
  | { type: "shift_down" }
  | { type: "shift_up" }

type SimpleDocument = { id: string }

export const documentsSelectionReducer = <D extends SimpleDocument,>(state: DocumentSelectionState<D>, action: Action<D>): DocumentSelectionState<D> => {
  switch (action.type) {
    case "set_documents_in_view":
      return {
        ...state,
        documentsInView: action.documents,
        lastClickedRow: null,
        highlightedRows: [-1, -1],
      }
    case "add_document":
      const selectedDocuments = [
        ...state.selectedDocuments,
        ...state.documentsInView.filter((d, index) => {
          if (state.shiftDown) {
            // add selection range
            return index >= state.highlightedRows[0] && index <= state.highlightedRows[1]
          } else {
            // add just one row
            return index === action.row
          }
        })
      ]
      return {
        ...state,
        // We need to de-duplicate because in the selected range there
        // may be documents we have already selected
        selectedDocuments: uniqBy(selectedDocuments, d => d.id)
      }
    case "remove_document": {
      const removeFromSelection = state.documentsInView.filter((d, index) => {
        if (state.shiftDown) {
          // add selection range
          return index >= state.highlightedRows[0] && index <= state.highlightedRows[1]
        } else {
          return index === action.row
        }
      })
      return {
        ...state,
        selectedDocuments: state.selectedDocuments.filter(d =>
          !removeFromSelection.some(remove => remove.id === d.id)
        ),
      }
    }
    case "set_documents":
      return {
        ...state,
        selectedDocuments: action.documents,
        lastClickedRow: null,
        shiftDown: false,
      }
    case "click_row": {
      const newState: DocumentSelectionState<D> = {
        ...state,
        lastClickedRow: action.row
      }
      if (state.lastClickedRow) {
        newState.highlightedRows = [state.lastClickedRow, action.row]
      }
      return newState
    }
    case "mouse_enter":
      return {
        ...state,
        highlightedRows: [state.lastClickedRow, action.row].sort() as [number, number],
      };
    case "mouse_leave":
      return {
        ...state,
        highlightedRows: [-1, -1],
      };
    case "shift_down":
      return {
        ...state,
        shiftDown: true,
      }
    case "shift_up":
      return {
        ...state,
        shiftDown: false,
      }
    default:
      return state;
  }
}

const initialState: DocumentSelectionState<SimpleDocument> = {
  documentsInView: [],
  selectedDocuments: [],
  lastClickedRow: null,
  cursorDocumentRow: null,
  shiftDown: false,
  highlightedRows: [-1, -1]
}

export const useDocumentsSelection= <D extends SimpleDocument,>(): [
  DocumentSelectionState<D>,
  Dispatch<ReducerAction<typeof documentsSelectionReducer>>,
] => {
  const [state, dispatch] = useReducer<typeof documentsSelectionReducer>(documentsSelectionReducer, initialState)
  return [state as DocumentSelectionState<D>, dispatch]
}
