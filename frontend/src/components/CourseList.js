import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CourseList = ({ courses }) => {
  const navigate = useNavigate();
  if (!courses || !Array.isArray(courses.data)) {
    return <div>No courses available</div>;
  }
  return (
    <div>
     

      <div  className='w-[90vw] m-auto flex flex-wrap h-auto p-12 gap-12 justify-center'>
        {courses?.data?.map(course => (

            <div onClick={()=>{navigate(`/course/${course?._id}`)}} className='w-[350px] h-[400px] shadow-xl rounded-sm p-4 flex flex-col gap-8 cursor-pointer'>
              <img src={course.thumbnail}  className='w-[100%]' alt={course.name} />
              <div>
                <div className='text-md font-semibold'>{course.name}</div>
                <p>Instructor :{course?.instructor}</p>
                <div className='text-sm'>Course Duration: {course.duration}</div>
                <div className='text-sm'>Course Mode: {course.location}</div>
               {<CourseButton enrollmentStatus={course.enrollmentStatus} /> } 
              </div>
            </div>
          
        ))}
      </div>
    </div>
  );
};

export default CourseList;

const CourseButton = ({ enrollmentStatus }) => {
  let bgColor = '';

  // Determine background color based on enrollment status
  switch (enrollmentStatus) {
    case 'Closed':
      bgColor = 'bg-gray-200';
      break;
    case 'Open':
      bgColor = 'bg-blue-200';
      break;
    case 'In Progress':
      bgColor = 'bg-green-300';
      break;
    default:
      bgColor = 'bg-gray-300';
  }

  return (
    <button className={`w-full mt-4 h-12 rounded-lg ${bgColor}`}>
      {enrollmentStatus}
    </button>
  );
};
