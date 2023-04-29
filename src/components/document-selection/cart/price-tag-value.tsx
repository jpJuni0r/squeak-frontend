import React, {useContext} from "react"
import Money from "@/shared/money";
import {SiteConfiguration, SiteConfigurationContext} from "@/context/site-configuration";

interface Props {
  amount: Money
}


function currencySignToCurrency(sign: string) {
  switch (sign) {
    case "€": return "EUR";
    case "$": return "USD";
    default:
      throw new Error(`Received unknown currency sign: ${sign}`)
  }
}

const moneyToText = (money: Money, siteConfiguration: SiteConfiguration) => {
  // This uses the browsers locale to select a fraction separator
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencySignToCurrency(siteConfiguration.currency.symbol),
    minimumFractionDigits: siteConfiguration.currency.minorDigits,
    maximumFractionDigits: siteConfiguration.currency.minorDigits,
  })

  return formatter.format(money.toMajorUnit())
}

const PriceTagValue = ({ amount }: Props) => {
  const siteConfiguration = useContext(SiteConfigurationContext);

  return (
    <span>{moneyToText(amount, siteConfiguration)}</span>
  )
}

export default PriceTagValue

