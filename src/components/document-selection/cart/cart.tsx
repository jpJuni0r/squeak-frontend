import React, {Dispatch, ReducerAction} from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import CartItem from "@/components/document-selection/cart/cart-item";
import CartSummary from "@/components/document-selection/cart/cart-summary";
import PrefillCartButton from "@/components/document-selection/cart/prefil-cart/prefill-cart-button";
import {DocumentSelectionState, documentsSelectionReducer} from "@/hooks/documents-selection";

interface Props {
  documentSelectionState: DocumentSelectionState<DocumentsQuery["documents"]["results"][0]>,
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
}

const Cart = ({documentSelectionState, documentSelectionDispatcher}: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title d-flex">
          <div className="flex-grow-1">
            Cart
          </div>
          <PrefillCartButton documentSelectionDispatcher={documentSelectionDispatcher} />
        </h5>
        <div className="hstack gap-3">

        </div>
        <ul className="list-group">
          {documentSelectionState.selectedDocuments.map(doc => (
            <CartItem doc={doc} key={doc.id} />
          ))}
        </ul>
        {!documentSelectionState.selectedDocuments.length ? (
          <em className="text-muted fs-6">No documents selected</em>
        ) : (
          <CartSummary
            docs={documentSelectionState.selectedDocuments}
            documentSelectionDispatcher={documentSelectionDispatcher}
          />
        )}
      </div>
    </div>
  )
}

export default Cart
