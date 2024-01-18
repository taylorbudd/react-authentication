import { useRef, useState, useEffect } from "react";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

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
            <a href="#">Sign Up</a>
        </span>
        </p>
    </section>
  );
};

export default Login;
