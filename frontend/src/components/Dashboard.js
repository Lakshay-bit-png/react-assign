// src/components/Dashboard.js

import React from 'react';

const Dashboard = ({ enrolledCourses }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Enrolled Courses</h3>
      <ul>
        {enrolledCourses?.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
      {/* Add more dashboard content as needed */}
    </div>
  );
};

export default Dashboard;
