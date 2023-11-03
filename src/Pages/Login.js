import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  }

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Clear any previous errors
  }

  const handleAuth = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Sign Up
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }

  return (
    <div className="loginPage">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <p>{isSignUp ? "Create an account" : "Sign in with your account"}</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In with Google</button>

      <div className="email-password-signin">
        <form onSubmit={handleAuth}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account? "}
          <span onClick={toggleSignUp} className="toggle-link">
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
