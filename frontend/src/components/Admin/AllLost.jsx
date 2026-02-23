import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { server } from "../../server";

const AllLost = () => {
  const [lostReports, setLostReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostReports = async () => {
      try {
        const { data } = await axios.get(
          `${server}/lost/admin-all-lost-items`,
          { withCredentials: true }
        );

        setLostReports(data.lostItems || []);
      } catch (error) {
        console.error("Error fetching lost reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLostReports();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Report ID",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      minWidth: 160,
      flex: 0.8,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 140,
      flex: 0.6,
    },
    {
      field: "location",
      headerName: "Location",
      minWidth: 160,
      flex: 0.8,
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
      headerName: "Reported On",
      minWidth: 150,
      flex: 0.7,
    },
  ];

  const rows = lostReports.map((item) => ({
    id: item._id,
    itemName: item.itemName,
    category: item.category || "—",
    location: item.location,
    status: item.status,
    createdAt: item.createdAt?.slice(0, 10),
  }));

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Lost Reports
      </h2>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          loading={loading}
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

export default AllLost;
