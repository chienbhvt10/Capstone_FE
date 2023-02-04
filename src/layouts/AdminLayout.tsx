import React from "react"
import Header from "./components/Header"
import { Box } from "@mui/material"
import Footer from "./components/Footer"

interface Props {
  children: React.ReactNode
}

const AdminLayout = (props: Props) => {
  const { children } = props
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  )
}

export default AdminLayout
