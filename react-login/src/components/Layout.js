import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="App">
      <h1>Welcome to the Authentication App!</h1>
      <br />
      <br />
        <Outlet />
    </main>
  )
}

export default Layout