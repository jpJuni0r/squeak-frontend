import React from "react";
import type { AppProps } from 'next/app'

import "@/components/layout/styles.scss";
import Layout from "@/components/layout/layout";

export default function App(props: AppProps) {
  return <Layout {...props} />
}
