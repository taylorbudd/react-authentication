import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const Logout = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/logout",{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (res.status !== 204) {
              throw new Error("Network response was not ok");
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
            navigate("/login", { replace: true });
        })
    }, []);

  return (
    <>
        {loading? (
            <div className="loader">
                <RingLoader color={"#123abc"} loading={loading} size={150} />
            </div>
        ): (
            <h1>Logged out.. Redirecting</h1>
        )}
    </>
  )
}

export default Logout