import React, {useEffect} from "react";
import {useLogout} from "@/hooks/authentication";
import {useRouter} from "next/router";

const LogoutPage = () => {
  const logout = useLogout()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      await logout()
      await router.replace("/")
    })()
  }, [logout, router])

  return (
    <p>Logout in progress...</p>
  )
}

export default LogoutPage