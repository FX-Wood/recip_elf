// shamelessly stolen from https://endertech.com/blog/using-reacts-context-api-for-global-state-management
import React, { createContext, useReducer } from "react";
import UserProfileReducer from "./UserProfileReducer";

const initialState = {
  server:
    process.env.NODE_ENV === "production"
      ? "https://www.recipelf.com/api"
      : "http://localhost:3000",
  name: "",
  dietaryRestrictions: [],
  token: "",
};

export const UserProfileContext = createContext(initialState);

export const UserProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserProfileReducer, initialState);
  /**
   * creates a user and takes a successCallback for navigating on success
   */
  async function signup(
    { name, email, password, dietaryRestrictions },
    successCallback = () => console.log("logged in!"),
  ) {
    const res = await fetch(`${state.server}/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        dietaryRestrictions,
      }),
    });
    const { token, profile } = await res.json();
    if (token) {
      dispatch({
        type: "SIGN_UP",
        payload: {
          token,
          profile,
        },
      });
      successCallback();
    } else {
      // TODO: handle auth failure
    }
  }
  /**
   * logs in a user and takes a successCallback for navigating on success
   */
  async function login(
    { email, password },
    successCallback = () => console.log("logged in!"),
  ) {
    const res = await fetch(`${state.server}/auth/login/credential`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const { token, profile } = await res.json();
    if (token) {
      dispatch({
        type: "LOG_IN",
        payload: {
          token,
          profile,
        },
      });
      successCallback();
    } else {
      // TODO: handle auth failure
    }
  }
  function logout() {
    dispatch({
      type: "LOG_OUT",
      payload: { token: "" },
    });
  }
  const providerValue = {
    server: state.server,
    name: state.name,
    dietaryRestrictions: state.dietaryRestrictions,
    token: state.token,
    signup,
    login,
    logout,
  };

  return (
    <UserProfileContext.Provider value={providerValue}>
      {children}
    </UserProfileContext.Provider>
  );
};
