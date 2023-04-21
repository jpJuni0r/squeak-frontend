import React, {useEffect, useState} from "react";
import Spinner from "@/components/spinner/spinner";

const ClientOnly = ({ children }: { children: React.ReactNode}) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsClient(true), 20000)
  }, [])

  if (!isClient) {
    return <Spinner delay={0} />
  }

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly
