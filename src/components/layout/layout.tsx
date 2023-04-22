import React from "react"
import MyApolloProvider from "./my-apollo-provider";
import {AppProps} from "next/app";
import Head from "next/head";
import UserContextProvider from "@/components/layout/user-context-provider";
import ConfigurationProvider from "@/components/layout/configuration-provider";
import LayoutContent from "@/components/layout/layout-content";

const Layout = (props: AppProps) => {
  return (
    <>
      <Head>
        <title>Exam Shop</title>
      </Head>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <UserContextProvider>
          <MyApolloProvider>
            <ConfigurationProvider>
              <LayoutContent {...props} />
            </ConfigurationProvider>
          </MyApolloProvider>
        </UserContextProvider>
      </div>
    </>
  )
}

export default Layout;
