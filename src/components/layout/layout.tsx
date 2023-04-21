import React from "react"
import MyApolloProvider from "./my-apollo-provider";
import Skeleton from "./skeleton";
import {AppProps} from "next/app";

const Layout = (props: AppProps) => {
  return (
    <MyApolloProvider>
      <Skeleton {...props} />
    </MyApolloProvider>
  )
}

export default Layout;
