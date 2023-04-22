import React from "react"
import Head from "next/head";
import {gql} from "@/model/generated";
import {useQuery} from "@apollo/client";
import Spinner from "@/components/spinner/spinner";
import {SiteConfigurationContext} from "@/context/site-configuration";

const configurationQuery = gql(`
query siteConfiguration {
  config {
    siteName
    printers {
      id
      name
      accountingPositions {
        id
        name
      }
    }
    currency {
      code
      symbol
      minorDigits
    }
  }
}
`)

const ConfigurationProvider = ({children}: { children: React.ReactNode }) => {
  const {data, loading, error} = useQuery(configurationQuery)

  if (loading) {
    return <Spinner/>
  } else if (error) {
    return <div className="text-danger">{error.message}</div>
  }

  return (
    <SiteConfigurationContext.Provider value={data!.config}>
      <Head>
        <title>{data!.config.siteName}</title>
      </Head>
      {children}
    </SiteConfigurationContext.Provider>
  )
}

export default ConfigurationProvider
