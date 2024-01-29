import React from "react";
import Cookies from "js-cookie";
import { Navigate, Link } from "react-router-dom";

const getUser = (token) => {
  try {
    fetch("/user",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res;
    })
    .then(res => res.json())
    .then((res) => {
      return res.user;
    })
  } catch (error) {
    
  }
}

const Home = () => {
    return (
      <>
        <h1>Welcome Home!</h1>
        <br />
        <br />
        <Link to="/logout">Logout</Link>
      </>
    );
};

export default Home;
