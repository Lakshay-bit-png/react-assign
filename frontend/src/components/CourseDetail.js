// src/components/CourseDetail.js

import React, { useEffect, useState } from 'react';

const CourseDetail = ({ course }) => {
  const [uid,setuid] = useState(null);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(()=>{
    try{
      setuid(localStorage.getItem('rid'))
    }
    catch{}
  },[uid]);

  useEffect(() => {
    // Check if the user is already enrolled in the course
    if (course?.students?.includes(uid)) {
        setEnrolled(true);
    } else {
        setEnrolled(false);
    }
}, [course, uid]);

  const enroll = async (e) => {
    e.preventDefault();
   

    try {
        // Make fetch call to login endpoint
        const response = await fetch('http://localhost:3030/api/course/'+course._id + "/" + uid, {
            method: 'PATCH',
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
        setEnrolled(true)
       
        
       
    } catch (error) {
       
        console.error('Login failed:', error); // Log the error
    }
};
  
  return (
    <div className=' flex flex-col gap-12 relative'>
      
      <img src={course?.thumbnail} className='min-h-200px min-w-200px max-h-[400px] max-w-[400px]' />
      <div>
      <p className='font-bold'>Title: {course?.name}</p>
      <p>Description: {course?.description}</p>
      <p>Instructor :{course?.instructor}</p>
      <p>Duration : {course?.duration}</p>
      <p>Schedule : {course?.schedule}</p>
      <p>Mode: {course?.location}</p>

      <br/>
      <h2 className='font-semibold text-xl'>Prerequisites</h2>
      <ul className='list-disc'>

      {course?.prerequisites?.map((pre)=>(
        <>
        <li>{pre}</li>
        </>
      ))}
      </ul>
      <h2 className='font-semibold text-xl mt-6'>Syllabus</h2>
      <ul className='list-disc'>
        {course?.syllabus?.map((week)=>(
          <li className='mb-4'>
            <div className='font-semibold'>WEEK {week?.week}
            </div>
            <div className='font-semibold'>{week?.topic}</div>
            <div>{week?.content}</div>
          </li>

        ))}
      </ul>
      {enrolled ? (
                <button className='mt-12 bg-gray-200 w-[120px] h-[40px] rounded-sm' disabled>Enrolled</button>
            ) : (
                <button onClick={enroll} className='mt-12 bg-green-200 w-[120px] h-[40px] rounded-sm'>Enroll</button>
            )}
      </div>
    </div>
  );
};

export default CourseDetail;
