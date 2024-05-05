// CourseListPage.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCourses } from '../redux/actions/courseActions';
import CourseList from '../components/CourseList';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Searchbar } from '../components/searchbar';

const CourseListPage = ({ courses, fetchCourses }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const id = localStorage.getItem('rid');
      if (id == null) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses.courses)

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    console.log(searchResults)
  };

  return (
    <>
      <Navbar />
      <div>
        <div className='text-3xl font-bold text-center mt-12 mb-12'>Course List</div>
        <Searchbar onSearchResults={handleSearchResults} />
        <CourseList courses={searchResults?.data?.length != 0 ? searchResults : courses.courses} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps, { fetchCourses })(CourseListPage);
