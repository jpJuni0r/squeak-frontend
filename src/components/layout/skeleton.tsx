import React from "react"
import Head from "next/head";
import {AppProps} from "next/app";

import UserContextProvider from "@/components/layout/user-context-provider";
import LayoutContent from "@/components/layout/layout-content";
import ConfigurationProvider from "@/components/layout/configuration-provider";

const Skeleton = (props: AppProps) => {
  return (
    <>
      <Head>
        <title>Exam Shop</title>
      </Head>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <UserContextProvider>
          <ConfigurationProvider>
            <LayoutContent {...props} />
          </ConfigurationProvider>
        </UserContextProvider>
      </div>
    </>
  )
}

export default Skeleton
