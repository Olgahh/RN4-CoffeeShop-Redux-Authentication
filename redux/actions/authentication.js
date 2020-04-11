import decode from "jwt-decode";
import { AsyncStorage } from "react-native";

import { SET_CURRENT_USER } from "./types";

import instance from "./instance";

const setCurrentUser = (token) => {
  setAuthToken(token);

  return {
    type: SET_CURRENT_USER,
    payload: token ? decode(token) : null,
  };
};

const setAuthToken = (token) => {
  if (token) {
    AsyncStorage.setItem("token", token);
    instance.defaults.headers.Authorization = `jwt ${token}`;
  } else {
    delete instance.defaults.headers.Authorization;
    AsyncStorage.removeItem("token");
  }
};

export const login = (userData, redirect) => async (dispatch) => {
  try {
    const res = await instance.post("login/", userData);
    const { token } = res.data;
    dispatch(setCurrentUser(token));
    redirect();
  } catch (err) {
    console.error(err, "While logging in");
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    await instance.post("register/", userData);
    dispatch(login(userData));
  } catch (err) {
    console.error(err, "While signing up");
  }
};

export const logout = () => setCurrentUser();

export const checkForToken = () => async (dispatch) => {
  const currentTimeInSeconds = Date.now() / 1000;
  const token = await AsyncStorage.getItem("token");

  if (token && decode(token).exp >= currentTimeInSeconds)
    dispatch(setCurrentUser(token));
  else dispatch(setCurrentUser());
};
