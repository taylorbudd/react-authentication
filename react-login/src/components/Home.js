import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
    const [user, setUser] = useState("");

    const navigate = useNavigate();

    const axios = useAxiosPrivate();

    useEffect(() => {
      try {
        axios.get("/",{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }).then((res) => {
          if (res.status !== 200) {
            throw new Error("Network response was not ok");
          }
          return res;
        })
        .then((res) => {
          setUser(res.data.user.username);
        })
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        if(error.response.status === 403 || error.response.status === 401){
          navigate('/login');
        } else{
          console.log(error);
        }
      }
    }, [])
    
    return (
      <>
        <h1>Welcome {user}!</h1>
        <br />
        <br />
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </>
    );
};

export default Home;
