import React from "react"
import {Cart, CartDash} from "react-bootstrap-icons";
import {DocumentsQuery} from "@/model/generated/graphql";

interface Props {
  doc: DocumentsQuery["documents"]["results"][0],
  selectedDocuments: DocumentsQuery["documents"]["results"],
  setSelectedDocuments: (documents: DocumentsQuery["documents"]["results"]) => void;
}

const CartButton = ({ doc, selectedDocuments, setSelectedDocuments}: Props) => {
  const selected= Boolean(selectedDocuments.find(d => d.id === doc.id))
  const toggle = () => {
    let newDocuments: DocumentsQuery["documents"]["results"]
    if (selected) {
      newDocuments = selectedDocuments.filter(d => d.id !== doc.id)
    } else {
      newDocuments = [...selectedDocuments, doc]
    }
    setSelectedDocuments(newDocuments)
  }

  return (
    <>
      {!selected ? (
        <button className="btn btn-sm btn-outline-primary add-to-cart-button" onClick={toggle}>
          <Cart />
        </button>
      ) : (
        <button className="btn btn-sm btn-outline-primary" onClick={toggle}>
          <CartDash />
        </button>
      )}
    </>
  )
}

export default CartButton
