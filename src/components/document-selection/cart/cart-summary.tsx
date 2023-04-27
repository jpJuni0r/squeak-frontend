import React, {useMemo} from "react"
import {DocumentsQuery, Permission} from "@/model/generated/graphql";
import AuthFence from "@/shared/auth-fence";
import PriceTag from "@/components/document-selection/cart/price-tag";
import OrderPickupButton from "@/components/document-selection/cart/order-pickup/order-pickup-button";
import OrderPrintButton from "@/components/document-selection/cart/order-print/order-print-button";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  clearDocuments: () => void
}

const CartSummary = ({ docs, clearDocuments }: Props) => {
  const pages = docs.reduce((akk, doc) => (doc.numPages ? doc.numPages : 0) + akk, 0)
  const orderPermissions = useMemo(() => [Permission.PrintDocuments, Permission.QueryPrice], []);
  const printPermissions = useMemo(() => [Permission.CreateOrders, Permission.QueryPrice], []);

  return (
    <>
      <hr />
      <div className="vstack gap-3">
        <AuthFence permissions={[Permission.QueryPrice]} quiet>
          <div>
            You have {pages} pages for <PriceTag docs={docs} numOralExamDeposits={0} />.
          </div>
        </AuthFence>

        <button className="btn btn-sm btn-outline-secondary" onClick={clearDocuments}>
          Clear selection
        </button>

        <AuthFence permissions={orderPermissions} quiet>
          <OrderPrintButton docs={docs} />
        </AuthFence>
        <AuthFence permissions={printPermissions} quiet>
          <OrderPickupButton docs={docs} />
        </AuthFence>
      </div>
    </>
  );
}

export default CartSummary;
