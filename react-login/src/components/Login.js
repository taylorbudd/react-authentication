import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Cookies } from "js-cookie";
import useAuth from '../hooks/useAuth';
import { set } from "mongoose";


const LOGIN_URL = "/login";

const Login = () => {
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, password: pwd }),
      })
        .then((res) => {
          if (!res.ok) {
            setErrMsg("Something went wrong");
          }
          return res;
        })
        .then(res  => res.json())
        .then((res) => {
          console.log(res);
          // set the session/token so that we can see the user is logged in on the server
          const accessToken = res.token;
          setAuth({user, accessToken});
          setUser("");
          setPwd("");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.log(error);
          if (!error?.response) {
            setErrMsg("Network error");
            return;
          } else if (error.response.status === 401) {
            setErrMsg("Invalid username or password");
            return;
          } else {
            setErrMsg("Something went wrong");
          }

          errRef.current.focus();
        });
    } catch (error) {
      console.log(error);
      setErrMsg("Something went wrong");
      return;
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          ref={userRef}
          type="text"
          id="username"
          autoComplete="off"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          required
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button>Sign In</button>
      </form>
      <p>
        Don't have an account? <br />
        <span className="line">
          {/*put router link here*/}
          <Link to="/register">Register</Link>
        </span>
      </p>
    </section>
  );
};


export default Login;
