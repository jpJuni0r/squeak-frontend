import React, {useMemo} from "react"
import {gql} from "@/model/generated";
import {DocumentsQuery, Permission} from "@/model/generated/graphql";
import AuthFence from "@/shared/auth-fence";
import PriceTag from "@/components/document-selection/cart/price-tag";
import FinalizeOrderButton from "@/components/document-selection/finalize-order/finalize-order-button";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  clearDocuments: () => void;
}

const orderMutation = gql(`
mutation printDocuments(
  $documentList: [DocumentId!]!,
  $deposits: [[LectureId!]!]!,
  $tag: String!,
  $totalPrice: Money!,
  $printerId: PrinterId!,
  $accountingPositionId: AccountingPositionId!,
  $donation: Money!
  $printFrontpage: Boolean!
) {
  printDocuments(
    documentList: $documentList,
    deposits: $deposits,
    tag: $tag,
    totalPrice: $totalPrice,
    printerId: $printerId,
    accountingPositionId: $accountingPositionId,
    donation: $donation,
    printFrontpage: $printFrontpage,
  ) {
    __typename
    ... on TransactionList {
      transactions {
        id
        value
        associatedTag
        transactionType
        timestamp
        lectures {
          id
          displayName
        }
      }
    }
    ... on InvalidIdError {
      errorCode
      msg
    }
    ... on StringTooLargeError {
      errorCode
      msg
    }
    ... on PriceError {
      errorCode
      msg
    }
    ... on GeneralError {
      errorCode
      msg
    }
  }
}
`)

const CartSummary = ({ docs, clearDocuments }: Props) => {
  const pages = docs.reduce((akk, doc) => (doc.numPages ? doc.numPages : 0) + akk, 0)
  const orderPermissions = useMemo(() => [Permission.PrintDocuments], []);

  return (
    <>
      <hr />
      <div className="vstack gap-3">
        <div>
          You have {pages} pages for <PriceTag docs={docs} numOralExamDeposits={0} />.
        </div>


        <button className="btn btn-sm btn-outline-secondary" onClick={clearDocuments}>
          Clear selection
        </button>

        <AuthFence permissions={orderPermissions} quiet>
          Go to printing
        </AuthFence>
        <AuthFence permissions={orderPermissions} invert quiet>
          <FinalizeOrderButton docs={docs} />
        </AuthFence>
      </div>
    </>
  );
}

export default CartSummary;
