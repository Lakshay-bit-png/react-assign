import React from 'react'

export const Profile = ({user}) => {
  return (
    <>
    <div className='text-3xl font-bold m-12'>User Dashboard</div>
    <div className='w-[90%] flex flex-col m-auto p-12 bg-gray-200 '>
    
        <div className='font-semibold text-'>Name : <span className='font-light'>{user?.name}</span></div>
        <div className='font-semibold text-'>Email : <span className='font-light'>{user?.email}</span></div>
        <div className='font-semibold text-'>Courses Enrolled :<span className='font-light'>{user?.courses?.length}</span></div>
    </div>
    </>
  )
}
