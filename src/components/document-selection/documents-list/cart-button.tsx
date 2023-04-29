import React, {Dispatch, ReducerAction} from "react"
import {Cart, CartDash} from "react-bootstrap-icons";
import {DocumentsQuery} from "@/model/generated/graphql";
import {DocumentSelectionState, documentsSelectionReducer} from "@/hooks/documents-selection";

interface Props {
  doc: DocumentsQuery["documents"]["results"][0],
  documentSelectionState: DocumentSelectionState<DocumentsQuery["documents"]["results"][0]>,
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
  row: number;
}

const CartButton = ({ doc, documentSelectionState, documentSelectionDispatcher, row}: Props) => {
  const selected= Boolean(documentSelectionState.selectedDocuments.find(d => d.id === doc.id))

  return (
    <>
      {!selected ? (
        <button
          className="btn btn-sm btn-outline-primary add-to-cart-button"
          onClick={() => documentSelectionDispatcher({ type: "add_document", row })}
        >
          <Cart />
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => documentSelectionDispatcher({ type: "remove_document", row })}
        >
          <CartDash />
        </button>
      )}
    </>
  )
}

export default CartButton
