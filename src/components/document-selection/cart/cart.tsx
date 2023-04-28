import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import CartItem from "@/components/document-selection/cart/cart-item";
import CartSummary from "@/components/document-selection/cart/cart-summary";
import PrefilCartButton from "@/components/document-selection/cart/prefil-cart/prefil-cart-button";

interface Props {
  selectedDocuments: DocumentsQuery["documents"]["results"],
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void
  clearDocuments: () => void;
}

const Cart = ({selectedDocuments, setSelectedDocuments, clearDocuments}: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title d-flex">
          <div className="flex-grow-1">
            Cart
          </div>
          <PrefilCartButton setSelectedDocuments={setSelectedDocuments} />
        </h5>
        <div className="hstack gap-3">

        </div>
        <ul className="list-group">
          {selectedDocuments.map(doc => (
            <CartItem doc={doc} key={doc.id} />
          ))}
        </ul>
        {!selectedDocuments.length ? (
          <em className="text-muted fs-6">No documents selected</em>
        ) : (
          <CartSummary docs={selectedDocuments} clearDocuments={clearDocuments} />
        )}
      </div>
    </div>
  )
}

export default Cart
