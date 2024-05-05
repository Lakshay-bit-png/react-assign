import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoBookmarkOutline } from "react-icons/io5";

const Dashcourse = ({ courses }) => {
  const navigate = useNavigate();
  const [uid,setuid] = useState(null);
  
  useEffect(()=>{
    try{
      const id = localStorage.getItem('rid')
      setuid(id)

      
    }
    catch{}
  },[uid])
  const markcomplete = async (cid) => {
    try {
      // Calculate new progress
      const currentCourse = courses.data.find(course => course._id === cid);
      const userIndex = currentCourse.students.indexOf(uid);
      const newProgress = [...currentCourse.progress];
      newProgress[userIndex] = 100; // Assuming completion means 100% progress
  
      // Make fetch call to update course progress
      const response = await fetch(`https://react-assign.onrender.com/api/course/${cid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progress: newProgress
        })
      });
  
      if (!response.ok) {
        // Handle non-successful response
        throw new Error('Failed');
      }
  
      const data = await response.json();
      console.log(data);
      setTimeout(() => {
        window.location.reload()
      }, 500);
     
  
      // Redirect to dashboard or any other page upon successful completion
    } catch (error) {
      console.error(error); // Log the error
    }
  };
  
  return (
    <div>
     
     <div className='text-2xl font-bold text-center'>Courses Enrolled</div>
     {courses?.data?.length==0 && <div className='text-center text-gray-400'>You have not enrolled to any course yet....</div>}
      <div  className='w-[90vw] m-auto flex flex-wrap h-auto p-12 gap-12 justify-center'>
        
        {courses?.data?.map(course => (
            
            <div  className='w-[350px] h-[480px] shadow-xl rounded-sm p-4 flex flex-col gap-8 cursor-pointer'>
              <img src={course.thumbnail}  className='w-[100%]' alt={course.name} />
              <div>
                <div  className='text-md font-semibold'>{course.name}</div>
                <p>Instructor :{course?.instructor}</p>
                <div className='text-sm'>Course Duration: {course.duration}</div>
                <div className='text-sm mb-1'>Course Mode: {course.location}</div>
                <div onClick={()=>{navigate(`/course/${course?._id}`)}} className='mb-2 font-semibold text-gray-500 text-right' >More Details </div>
                {course?.progress[course?.students?.indexOf(uid)]} % Complete
                <div className='w-[100%] bg-gray-300 h-3 '>
                    <div style={{ width: `${course?.progress[course?.students?.indexOf(uid)]}%` }} className={`h-3 bg-green-500`}></div>
                </div>

               {course?.progress[course?.students?.indexOf(uid)]!="100" && <div className='mt-2 text-gray-400 z-2' onClick={()=>markcomplete(course._id)}><IoBookmarkOutline/> Mark Course Completion</div>} 
              
              </div>
              <div>Due Date: {course?.date}</div>
            </div>
          
        ))}
      </div>
      
    </div>
  );
};

export default Dashcourse;

const CourseButton = () => {
  let bgColor = 'bg-green-100';

  // Determine background color based on enrollment status
  

  return (
    <button className={`w-full mt-4 h-12 rounded-lg ${bgColor}`}>
            Enrolled
    </button>
  );
};
