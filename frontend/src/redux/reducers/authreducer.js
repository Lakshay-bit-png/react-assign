// src/redux/reducers/authReducer.js

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
  } from '../types';
  
  const initialState = {
    user: null, // User data
    loading: false, // Loading state
    error: null // Error message
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case SIGNUP_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case LOGIN_SUCCESS:
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: null
        };
      case LOGIN_FAILURE:
      case SIGNUP_FAILURE:
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  