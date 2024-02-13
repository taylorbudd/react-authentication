import { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {
  const axios = useAxiosPrivate();

  const navigate = useNavigate();

  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get('/profile', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((res) => {
      if (res.status !== 200){
        throw new Error('Network response was not ok')
      }
      setUser(res.data.user);
    }).catch((error) => {
      if(error.response.status === 403 || error.response.status === 401){
        navigate('/login');
      } else {
        console.log(error);
      }
    })
  }, [])

  return (
    <>
    <div>Here are your details:</div>
    <p>Your username is: {user.username}</p>
    <br />
    <br />
    <Link to="/">Home</Link>
    </>
  )
}

export default Profile