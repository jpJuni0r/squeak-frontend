import React from "react";

export type UserContextType = {
  setUserContext: (currentContext: UserContextContent) => void,
  userContext: UserContextContent
}

export type UserContextContent =
  | ({ status: "signed-in" } & UserInfo)
  | { status: "signed-out" }

export type UserInfo = { username: string, displayName: string, token: string }

// Arbitrary values are OK here, see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
const defaultValues: UserContextType = {
  setUserContext: (_context) => {},
  userContext: {
    status: "signed-out"
  }
}

export const UserContext = React.createContext<UserContextType>(defaultValues);
