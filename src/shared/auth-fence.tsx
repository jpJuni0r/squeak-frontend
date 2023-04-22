import React, {useContext} from "react"
import {UserContext} from "@/context/user";
import {Permission} from "@/model/generated/graphql";

interface Props {
  /**
   * The user requires to have all selected permissions to pass.
   */
  permissions: Permission[],
  /**
   * Inverts the permissions condition
   */
  invert?: boolean,
  children?: React.ReactNode,
  /**
   * When set, it doesn't show warnings for invalid permissions.
   */
  quiet?: boolean;
}

/**
 * Renders its children only, if the preconditions are met.
 */
const AuthFence = ({ permissions, invert, quiet, children }: Props) => {
  const { userContext } = useContext(UserContext)

  if (!invert) {
    const missingPermission = permissions.filter(p => !userContext.permissions.includes(p))

    if (missingPermission.length) {
      if (!quiet) {
        return (
          <div className="text-danger">
            Unauthorized: You are missing the
            {missingPermission.length === 1 ? " permission " : " permissions "}
            {missingPermission.join(", ")}.
          </div>
        )
      } else {
        // suppress warning
        return null
      }
    }
  } else {
    const matchingPermission = permissions.find(p => userContext.permissions.includes(p))
    if (matchingPermission) {
      return null;
    }
  }

  return (
    <>
      {children}
    </>
  )
}

export default AuthFence
