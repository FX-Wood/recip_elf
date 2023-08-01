import { React, useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "./LoginForm.css";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useContext(UserProfileContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * need this so that we can redirect after login.
   * if you know a better way to do this let me know
   */
  const loginSuccessCallback = () => {
    console.log("login success custom callback");
    const origin = location.state?.from?.pathname || "/ingredients";
    console.log("navigating to origin for niceness", origin);
    navigate(origin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    login(data, loginSuccessCallback);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          autoComplete="username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="box">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="b">Login</button>
    </form>
  );
};

export default LoginForm;
