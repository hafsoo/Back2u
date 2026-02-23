import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const AdminHeader = () => {
    const {user} = useSelector((state) => state.user);

  return (
         <div 
         className="w-full h-[80px] sm:h-[100px] bg-white shadow sticky top-0 left-0 z-30 flex flex-wrap sm:flex-nowrap items-center justify-between px-4"
         //className="w-full h-[100px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4"
         >
      <div>
        <Link to="/">
          <img
            src="/images/logoo.png"
            alt=""
            className='h-[60px] sm:h-[100px] w-auto'
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
            <img
              src={`${user?.avatar?.url}`}
              alt=""
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover"
              //className="w-[50px] h-[50px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader