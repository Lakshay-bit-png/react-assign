// src/redux/actions/authActions.js

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
  } from '../types';
  
  // Action creator for login
  export const login = (email, password) => {
    return async (dispatch) => {
      dispatch({ type: LOGIN_REQUEST });
      try {
        const response = await fetch('https://react-assign.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email,password })
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: LOGIN_SUCCESS, payload: data });
         

        } else {
          throw new Error(data.message || 'Login failed');
        }
      } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
      }
    };
  };
  
  // Action creator for signup
  export const signup = (name, email, password) => {
    return async (dispatch) => {
      dispatch({ type: SIGNUP_REQUEST });
      try {
        const response = await fetch('https://react-assign.onrender.com/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: SIGNUP_SUCCESS, payload: data });
        } else {
          throw new Error(data.message || 'Signup failed');
        }
      } catch (error) {
        dispatch({ type: SIGNUP_FAILURE, payload: error.message });
      }
    };
  };
  
