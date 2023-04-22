import React from "react";
import {Permission} from "@/model/generated/graphql";

export type UserContextType = {
  setUserContext: (currentContext: UserContextContent) => void,
  userContext: UserContextContent
}

type PermissionsField = { permissions: Permission[] }

export type UserContextContent =
  | ({ status: "signed-in" } & UserInfo & PermissionsField)
  | { status: "signed-out" } & PermissionsField

export type UserInfo = { username: string, displayName: string, token: string }

// Arbitrary values are OK here, see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
const defaultValues: UserContextType = {
  setUserContext: (_context) => {},
  userContext: {
    status: "signed-out",
    permissions: [],
  }
}

export const UserContext = React.createContext<UserContextType>(defaultValues);
