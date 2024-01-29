import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    setValidPwd(PASS_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usrname = USER_REGEX.test(user);
    const pass = PASS_REGEX.test(pwd);
    if (!usrname || !pass) {
      setErrMsg("Invalid username or password");
      return;
    }
    console.log("USER: " + user);
    console.log("PWD: " + pwd);
    try {
      fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, password: pwd }),
      })
        .then((res) => {
          if (res.status !== 200) {
            res.json().then((data) => setErrMsg(data.message));
          } else {
            setSuccess(true);
          }
        })
        .catch((error) => {
          if (!error?.reponse) {
            setErrMsg("No server response");
          } else if (error.response?.status === 409) {
            setErrMsg("Username already exists");
          } else {
            setErrMsg("Something went wrong");
          }
          errRef.current.focus();
        });
    } catch (error) {
      setErrMsg("Something went wrong");
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            You have successfully registered. <br />
            <span className="line">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Usernames must be 4-24 characters long and start with a letter.
              <br />
              They must begin with a letter <br />
              Letters, numbers, underscores, and hyphens are allowed.
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords must be 8-24 characters long <br />
              Must contain a lowercase letter, uppercase letter, number, and
              special character. <br />
              Allowed special characters:{" "}
              <span aria-label="exlamation mark">!</span>
              <span aria-label="at sign">@</span>{" "}
              <span aria-label="hash sign">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent sign">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              name="confirm_pwd"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field
            </p>
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already Registered? <br />
            <span className="line">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
