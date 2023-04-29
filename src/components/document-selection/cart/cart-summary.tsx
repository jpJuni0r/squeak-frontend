import React, {Dispatch, ReducerAction, useMemo} from "react"
import {DocumentsQuery, Permission} from "@/model/generated/graphql";
import AuthFence from "@/shared/auth-fence";
import PriceTag from "@/components/document-selection/cart/price-tag";
import OrderPickupButton from "@/components/document-selection/cart/order-pickup/order-pickup-button";
import OrderPrintButton from "@/components/document-selection/cart/order-print/order-print-button";
import {documentsSelectionReducer} from "@/hooks/documents-selection";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  documentSelectionDispatcher: Dispatch<ReducerAction<typeof documentsSelectionReducer>>
}

const CartSummary = ({docs, documentSelectionDispatcher}: Props) => {
  const pages = docs.reduce((akk, doc) => (doc.numPages ? doc.numPages : 0) + akk, 0)
  const orderPermissions = useMemo(() => [Permission.PrintDocuments, Permission.QueryPrice], []);
  const printPermissions = useMemo(() => [Permission.CreateOrders, Permission.QueryPrice], []);

  return (
    <>
      <hr/>
      <div className="vstack gap-3">
        <AuthFence permissions={[Permission.QueryPrice]} quiet>
          <div>
            You have{" "}
            {docs.length}{" "}
            {docs.length === 1 ? "document " : "documents "}
            with{" "}
            {pages}{" "}
            {pages === 1 ? "page " : "pages "}
            for{" "}
            <PriceTag docs={docs} numOralExamDeposits={docs.length}/>.
          </div>
        </AuthFence>

        <button className="btn btn-sm btn-outline-secondary" onClick={() => documentSelectionDispatcher({
          type: "set_documents",
          documents: [],
        })}>
          Clear selection
        </button>

        <AuthFence permissions={orderPermissions} quiet>
          <OrderPrintButton docs={docs}/>
        </AuthFence>
        <AuthFence permissions={printPermissions} quiet>
          <OrderPickupButton docs={docs}/>
        </AuthFence>
      </div>
    </>
  );
}

export default CartSummary;
