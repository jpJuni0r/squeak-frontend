import React, {useContext, useMemo} from "react"
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

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
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    const httpLink = createHttpLink({
      uri: BACKEND_API,
    })

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }, [token])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default MyApolloProvider;
