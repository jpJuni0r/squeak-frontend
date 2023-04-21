import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import CartItem from "@/components/document-selection/cart/cart-item";
import CartSummary from "@/components/document-selection/cart/cart-summary";

interface Props {
  selectedDocuments: DocumentsQuery["documents"]["results"],
}

const Cart = ({selectedDocuments}: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Cart</h5>
        <div className="hstack gap-3">

        </div>
        <ul className="list-group">
          {selectedDocuments.map(doc => (
            <CartItem doc={doc} key={doc.id} />
          ))}
        </ul>
        {!selectedDocuments.length && (
          <em className="text-muted fs-6">No documents selected</em>
        )}
        <CartSummary docs={selectedDocuments} />
      </div>
    </div>
  )
}

export default Cart
