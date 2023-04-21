import React, {useEffect, useState} from "react"

import Spinner from "@/components/spinner/spinner";
import {UserContext, UserContextContent} from "@/context/user";
import {getUserSession, setSessionToken} from "@/hooks/authentication";

const UserContextProvider = ({children}: { children: React.ReactNode }) => {
  const [userContext, setUserContext] = useState<UserContextContent>(null as any);
  useEffect(() => {
    (async () => {
      const initialUserContext = await getUserSession()
      if (!initialUserContext) {
        // clear any expired tokens, if present
        await setSessionToken(null)
      }
      setUserContext(initialUserContext)
    })()
  }, [])

  if (!userContext) {
    return <Spinner />
  }

  return (
    <UserContext.Provider value={{userContext, setUserContext}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider
