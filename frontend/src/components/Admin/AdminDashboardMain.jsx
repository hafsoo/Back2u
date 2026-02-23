import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { server } from "../../server";

const AdminDashboardMain = () => {
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [latestReports, setLatestReports] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data: lostData } = await axios.get(
          `${server}/lost/admin-all-lost-items`,
          { withCredentials: true }
        );

        const { data: foundData } = await axios.get(
          `${server}/found/admin-all-found-items`,
          { withCredentials: true }
        );

        setLostReports(lostData.lostItems || []);
        setFoundReports(foundData.foundItems || []);

        const combined = [
          ...(lostData.lostItems || []).map((i) => ({
            ...i,
            reportType: "Lost",
          })),
          ...(foundData.foundItems || []).map((i) => ({
            ...i,
            reportType: "Found",
          })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLatestReports(combined.slice(0, 5));
      } catch (error) {
        console.error("Admin dashboard error:", error);
      }
    };

    fetchReports();
  }, []);

  // ================= DATAGRID =================
  const columns = [
    {
      field: "id",
      headerName: "Report ID",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "itemName",
      headerName: "Item",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "reportType",
      headerName: "Type",
      minWidth: 120,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.6,
      cellClassName: (params) =>
        params.value === "claimed" ? "greenColor" : "redColor",
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      flex: 0.7,
    },
  ];

  const rows = latestReports.map((item) => ({
    id: item._id,
    itemName: item.itemName,
    reportType: item.reportType,
    status: item.status,
    createdAt: item.createdAt?.slice(0, 10),
  }));

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* ================= OVERVIEW ================= */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* TOTAL REPORTS */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Total Reports
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {lostReports.length + foundReports.length}
              </h2>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <AiOutlineFileSearch size={26} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* LOST REPORTS */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Lost Reports
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {lostReports.length}
              </h2>
              <Link
                to="/admin-all-lost"
                className="text-sm text-blue-600 hover:underline mt-3 inline-block"
              >
                View Reports →
              </Link>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <MdReportProblem size={26} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* FOUND REPORTS */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Found Reports
              </p>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {foundReports.length}
              </h2>
              <Link
                to="/admin-all-founds"
                className="text-sm text-blue-600 hover:underline mt-3 inline-block"
              >
                View Reports →
              </Link>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <AiOutlineFileSearch size={26} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= LATEST REPORTS ================= */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Latest Reports
      </h3>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: "600",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboardMain;
