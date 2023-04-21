import React from "react";
import {AppProps} from "next/app";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

const LayoutContent = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <div className="page-container">
        <div className="flex-fill">
          <Header/>
          <Component/>
        </div>
        <Footer/>
      </div>
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default LayoutContent
