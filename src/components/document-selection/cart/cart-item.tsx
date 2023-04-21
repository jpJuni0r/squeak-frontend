import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";

interface Props {
  doc: DocumentsQuery["documents"]["results"][0]
}

const CartItem = ({ doc }: Props) => {
  return (
    <li className="list-group-item hstack gap-1">
      <div className="flex-grow-1">
        {doc.lectures.map(l => l.displayName).join(", ")}
      </div>
      <div>
        {doc.numPages}&nbsp;
        {doc.numPages === 1 ? "page" : "pages"}
      </div>
    </li>
  )
}

export default CartItem
