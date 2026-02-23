import React from 'react';
import AdminHeader from '../components/Layout/AdminHeader';
import AdminSideBar from '../components/Admin/Layout/AdminSideBar';
import AllClaims from "../components/Admin/AllClaims"
const AdminClaimPage = () => {
    return (
        <div>
      <AdminHeader/>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] lg:w-[400px]">
            <AdminSideBar active={6} />
          </div>
          <AllClaims />
        </div>
      </div>
    </div>
    );
};

export default AdminClaimPage;