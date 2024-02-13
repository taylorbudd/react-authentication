import React from 'react'
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <>
      <div>Sorry! Page not found.</div>
      <Link to="/">Go back to home</Link>
    </>
  )
}

export default Missing