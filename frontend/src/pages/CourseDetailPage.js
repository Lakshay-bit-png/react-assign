import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById } from '../redux/actions/courseActions';
import CourseDetail from '../components/CourseDetail';
import Navbar from './Navbar';

const CourseDetailPage = ({ course, fetchCourseById }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
    try{
      const id = localStorage.getItem('rid')
      if(id==null){
        navigate('/')
      }
    }
    catch{}
  })
  useEffect(() => {
    // Fetch the course details by ID
    fetchCourseById(id);
  }, [id]); // Fetch when the ID changes
  console.log(course)
  // Check if course data is available
  if (!course) {
    // Handle loading state or redirect to a loading page
    return <div>Loading...</div>;
  }



  return (
    <>
    <Navbar/>
    <div className='w-[90vw] m-auto shadow-2xl p-12'>
     
      <CourseDetail course={course.courses.data} />
    </div>
    </>
  );
};

const mapStateToProps = state => ({
  course: state.courses // Assuming the course details are stored in the state as 'course'
});

export default connect(mapStateToProps, { fetchCourseById })(CourseDetailPage);
