import { Inter } from 'next/font/google'
import DocumentSelection from "@/components/document-selection/document-selection";

// See: https://wiki.fsmi.uni-karlsruhe.de/wiki/Corporate_Identity
const inter = Inter({ subsets: ['latin'] })

const HomePage = () => {
  // Stuff
  return (
    <DocumentSelection />
  )
}

export default HomePage
