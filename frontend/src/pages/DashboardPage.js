// src/pages/DashboardPage.js

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCourses } from '../redux/actions/courseActions';

import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Dashcourse from '../components/dashcourse';
import { Profile } from '../components/profile';

const DashboardPage = ({ courses , fetchCourses }) => {
  const navigate = useNavigate();
  const [uid,setuid] = useState(null);
  const [filtercourse , setFilteredCourses] = useState(null) ;
  const [user,setuser] = useState(null);

  

  useEffect(()=>{
    try{
      const id = localStorage.getItem('rid')
      setuid(id)
      if(id==null){
        navigate('/')
      }
    }
    catch{}
  },[uid])

  useEffect(() => {
    fetchCourses();
  }, []);
  console.log(courses.courses)

  useEffect(() => {
    try{
 // Filter courses based on the condition that the students array contains userId
 const filtered = courses?.courses?.data?.filter(course => course.students.includes(uid));
 setFilteredCourses({data:filtered , open:false});
 console.log(filtered)
    }
    catch{}
   
  }, [courses, uid]);

  useEffect(()=>{
    const getuser = async()=>{
      try {
        // Make fetch call to login endpoint
        const response = await fetch('https://react-assign.onrender.com/api/users/'+uid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
           
        });

        if (!response.ok) {
            // Handle non-successful response
            throw new Error('Login failed');
        }


        const data = await response.json();
        console.log(data)
        
        setuser(data)
         // Redirect to dashboard or any other page upon successful login
    } catch (error) {
       
        console.error('Login failed:', error); // Log the error
    }
    }
    getuser()
  },[uid])

  return (
    <div>
      <Navbar/>
      
      <Profile user={user?.data}/>
      <br/>
      <Dashcourse courses={filtercourse}/>
      

      
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses,
});


export default connect(mapStateToProps, { fetchCourses })(DashboardPage);
