import React, {useContext} from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Money from "@/shared/money";
import {SiteConfiguration, SiteConfigurationContext} from "@/context/site-configuration";

interface Props {
  docs: DocumentsQuery["documents"]["results"],
  numOralExamDeposits: number,
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

function currencySignToCurrency(sign: string) {
  switch (sign) {
    case "€": return "EUR";
    case "$": return "USD";
    default:
      throw new Error(`Received unknown currency sign: ${sign}`)
  }
}

const minorMoneyToText = (minorMoney: number, siteConfiguration: SiteConfiguration) => {
  const money = new Money(minorMoney)

  // This uses the browsers locale to select a fraction separator
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencySignToCurrency(siteConfiguration.currency.symbol),
    minimumFractionDigits: siteConfiguration.currency.minorDigits,
    maximumFractionDigits: siteConfiguration.currency.minorDigits,
  })

  return formatter.format(minorMoney)
}
const PriceTag = ({ docs, numOralExamDeposits }: Props) => {
  const { data, previousData, loading, error } = useQuery(priceQuery, {
    variables: {
      documents: docs.map(d => d.id),
      numOralExamDeposits,
    },
  })
  const siteConfiguration = useContext(SiteConfigurationContext);

  if (loading) {
    if (previousData) {
      return <span className="price-tag text-muted">{minorMoneyToText(previousData!.price!, siteConfiguration)}</span>
    } else {
      return <span className="price-tag text-muted">…</span>
    }
  } if (error) {
    return <span className="text-danger">{error.message}</span>
  } else if (data!.price === null) {
    return <span className="text-danger">Price calculation failed</span>
  }

  return (
    <span className="price-tag">
      {minorMoneyToText(data!.price!, siteConfiguration)}
    </span>
  )
}

export default PriceTag

