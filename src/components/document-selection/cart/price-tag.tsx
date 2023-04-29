import React, {useContext, useEffect, useMemo} from "react"
import {DocumentsQuery} from "@/model/generated/graphql";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import {SiteConfiguration, SiteConfigurationContext} from "@/context/site-configuration";
import {useForm} from "react-final-form";
import Money from "@/shared/money";
import {OrderPrintFormValues} from "@/components/document-selection/cart/order-print/order-print-form";
import PriceTagValue from "@/components/document-selection/cart/price-tag-value";

interface Props {
  docs: DocumentsQuery["documents"]["results"]
  numOralExamDeposits: number
  /**
   * Donation amount as a major number
   */
  donation?: number
  /**
   * When set, we'll put the calculated price in a form value.
   */
  storePriceInField?: boolean;
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

const StorePriceInField = ({price}: {price: Money}) => {
  const form = useForm<OrderPrintFormValues>()
  useEffect(() => {
    form.change("price", price)
    // Reduce number of re-renders for changes price instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, price.amount])

  return null
}

const PriceTag = ({ docs, numOralExamDeposits, donation, storePriceInField }: Props) => {
  const { data, previousData, loading, error } = useQuery(priceQuery, {
    variables: {
      documents: docs.map(d => d.id),
      numOralExamDeposits,
    },
  })
  const siteConfiguration = useContext(SiteConfigurationContext);

  let amount = new Money(data?.price || 0)

  if (loading) {
    if (!previousData) {
      return <span className="price-tag text-muted">…</span>
    } else {
      amount = new Money(previousData.price!)
    }
  } else if (error) {
    return <span className="text-danger">{error.message}</span>
  } else if (data!.price === null) {
    return <span className="text-danger">Price calculation failed</span>
  }

  if (donation !== undefined) {
    amount = amount.add(Money.fromMajorUnit(donation))
  }

  return (
    <>
      <PriceTagValue amount={amount} />
      {storePriceInField && (
        <StorePriceInField price={amount}/>
      )}
    </>
  )
}

export default PriceTag

