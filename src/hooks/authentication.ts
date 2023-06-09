import {useContext} from "react";
import * as localforage from "localforage";
import fetch from "isomorphic-unfetch";
import {UserContext, UserContextContent, UserInfo} from "@/context/user";
import {BACKEND_API} from "@/shared/config";
import {HeadersInit} from "node-fetch";
import {Permission} from "@/model/generated/graphql";
import {useApolloClient} from "@apollo/client";
import {gql} from "@/model/generated";

const STORAGE_TOKEN_KEY = "token"

/**
 * This hook is called once a successful authentication request happens.
 * It persists the session token and stores the users' profile information
 * in the user context.
 */
export const useProcessAuthentication = () => {
  const {setUserContext} = useContext(UserContext)

  return async (userInfo: UserInfo, permissions: Permission[]) => {
    setUserContext({
      status: "signed-in",
      ...userInfo,
      permissions,
    })
    await setSessionToken(userInfo.token)
  }
}

export const useLogout = () => {
  const {setUserContext} = useContext(UserContext)
  return async () => {
    await setSessionToken(null)
    // We cannot use apollo client here, because the `setSessionToken(null)`
    // will not immediately clear the session token.
    const session = await getUserSession()
    setUserContext({ status: "signed-out", permissions: session.permissions })
  }
}

export const setSessionToken = async (token: string | null) => {
  await localforage.setItem<string | null>(STORAGE_TOKEN_KEY, token)
}

export const getSessionToken = async () => {
  return await localforage.getItem<string | null>(STORAGE_TOKEN_KEY)
}

/**
 * This function is called once on initial page load to get the data
 * for the {@see UserContext}. We can't use Apollo for the request,
 * because it's not ready yet.
 */
export const getUserSession = async (): Promise<UserContextContent> => {
  const token = await getSessionToken()

  const userContext: UserContextContent= { status: "signed-out", permissions: [] }

  try {
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(BACKEND_API, {
      method: "POST",
      body: JSON.stringify({
        query: `{
          me {
            user {
              username
              displayName
            }
            permissions
          }
        }`
      }),
      headers,
    })

    if (!response.ok) {
      return userContext
    }

    const content = await response.json() as any

    userContext.permissions = content.data.me.permissions

    if (!content.data.me.user || !token) {
      return userContext
    }

    const { username, displayName } = content.data.me.user

    return {
      status: "signed-in",
      username,
      displayName,
      token,
      permissions: userContext.permissions,
    }
  } catch (e) {
    return userContext
  }
}
