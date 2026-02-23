import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllUsers from '../components/Admin/AllUsers';

const AdminUsersPage = () => {
    return (
        <div>
      <AdminHeader/>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] lg:w-[400px]">
            <AdminSideBar active={4} />
          </div>
          <AllUsers/>
        </div>
      </div>
    </div>
    );
};

export default AdminUsersPage;