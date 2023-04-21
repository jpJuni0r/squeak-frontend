import {useContext} from "react";
import * as localforage from "localforage";
import fetch from "isomorphic-unfetch";
import {UserContext, UserContextContent, UserInfo} from "@/context/user";
import {BACKEND_API} from "@/shared/config";

const STORAGE_TOKEN_KEY = "token"

/**
 * This hook is called once a successful authentication request happens.
 * It persists the session token and stores the users' profile information
 * in the user context.
 */
export const useProcessAuthentication = () => {
  const {setUserContext} = useContext(UserContext)

  return async (userInfo: UserInfo) => {
    setUserContext({
      status: "signed-in",
      ...userInfo,
    })
    await setSessionToken(userInfo.token)
  }
}

export const useLogout = () => {
  const {setUserContext} = useContext(UserContext)
  return async () => {
    await setSessionToken(null)
    setUserContext({ status: "signed-out" })
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

  const signedOut: UserContextContent= { status: "signed-out" }

  if (!token) {
    return signedOut
  }

  try {
    const response = await fetch(BACKEND_API, {
      method: "POST",
      body: JSON.stringify({
        query: `{
          me {
            user {
              username
              displayName
            }
          }
        }`
      }),
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      return signedOut
    }

    const content = await response.json() as any

    if (!content.data || !content.data.me.user) {
      return signedOut
    }

    const { username, displayName } = content.data.me.user

    return {
      status: "signed-in",
      username,
      displayName,
      token,
    }
  } catch (e) {
    return signedOut
  }
}
