import React from "react";
import {SiteConfigurationQuery} from "@/model/generated/graphql";

export type SiteConfiguration = SiteConfigurationQuery["config"]

// Arbitrary values are OK here, see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
const defaultValues: SiteConfiguration = {
  siteName: "",
  currency: {
    code: "",
    symbol: "",
    minorDigits: 0,
  },
  printers: [],
}

export const SiteConfigurationContext = React.createContext<SiteConfiguration>(defaultValues)
