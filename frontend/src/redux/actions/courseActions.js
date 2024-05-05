import { FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILURE } from '../types';

// Action creator to fetch courses
export const fetchCourses = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COURSES_REQUEST });
    try {
      // Fetch courses from API
      const response = await fetch('https://react-assign.onrender.com/api/course');
      const data = await response.json();
      dispatch({ type: FETCH_COURSES_SUCCESS, payload: data });
      console.log(data)
    } catch (error) {
      dispatch({ type: FETCH_COURSES_FAILURE, payload: error.message });
    }
  };
};

export const fetchCourseById = (courseId) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_COURSES_REQUEST });
      try {
        // Fetch course from API
        const response = await fetch(`https://react-assign.onrender.com/api/course/${courseId}`);
        const data = await response.json();
        dispatch({ type: FETCH_COURSES_SUCCESS, payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: FETCH_COURSES_FAILURE, payload: error.message });

      }
    };
  };
