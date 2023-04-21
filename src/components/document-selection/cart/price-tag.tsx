import React from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Money from "@/shared/money";

interface Props {
  docs: DocumentsQuery["documents"]["results"],
}

const priceQuery = gql(`
query price(
  $documents: [DocumentId!]!,
  $numOralExamDeposits: Int!
) {
  price(
    documents: $documents,
    numOralExamDeposits: $numOralExamDeposits,
  )
}
`)

const PriceTag = ({ docs }: Props) => {
  const { data, loading, error } = useQuery(priceQuery)

  if (loading) {
    return <>&vellip;</>
  } if (error) {
    return <div className="text-danger">{error.message}</div>
  } else if (!data!.price) {
    return <div className="text-danger">Price calculation failed</div>
  }

  const money = new Money(data!.price!)
  // assume german decimal separator
  const text = new Intl.NumberFormat("de-DE", { style: "currency", currencySign: "" })

  return money.toString()
}
