import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import CourseListPage from '../pages/CourseListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import DashboardPage from '../pages/DashboardPage';

export const Routing = () => {
  return (
    
        <Router>
            <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/course/:id" element={<CourseDetailPage/>}/>
                <Route path="/courses" element={<CourseListPage />}/>
                <Route path="/dash" element={<DashboardPage />}/>
                

            </Routes>

        </Router>

  )
}
