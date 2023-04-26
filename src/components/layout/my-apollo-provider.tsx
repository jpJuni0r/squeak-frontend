import React, {useContext, useMemo} from "react"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from "apollo-upload-client"

import {UserContext} from "@/context/user";
import {BACKEND_API} from "@/shared/config";

interface Props {
  children?: React.ReactNode;
}

const MyApolloProvider = ({ children }: Props) => {
  const { userContext } = useContext(UserContext)
  const token = userContext.status === "signed-in" ? userContext.token : null

  const client = useMemo(() => {
    const authLink = setContext((_, { headers }) => {
      const newHeaders = {
        ...headers,
      }
      if (token) {
        newHeaders["Authorization"] = `Bearer ${token}`
      }

      return {
        headers: newHeaders
      }
    });

    const fileUploadLink = createUploadLink({
      uri: BACKEND_API,
    })

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(fileUploadLink),
    });
  }, [token])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default MyApolloProvider;
