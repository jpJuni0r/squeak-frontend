import React from "react"
import {gql} from "@/model/generated";
import {DocumentsQuery, SiteConfigurationQuery} from "@/model/generated/graphql";
import Money from "@/shared/money";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
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

const CartSummary = ({ docs }: Props) => {
  const pages = docs.reduce((akk, doc) => (doc.numPages ? doc.numPages : 0) + akk, 0)

  return (
    <>
      <hr />
      <div>

      </div>
    </>
  );
}

export default CartSummary;
