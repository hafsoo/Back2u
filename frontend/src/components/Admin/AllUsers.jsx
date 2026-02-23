import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@mui/material";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${server}/user/admin-all-users`,
        { withCredentials: true }
      );
      setUsers(data.users);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUserHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `${server}/user/delete-user/${id}`,
        { withCredentials: true }
      );
      fetchUsers();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.5,
      cellClassName: (params) =>
        params.value === "Admin" ? "greenColor" : "redColor",
    },
    {
      field: "createdAt",
      headerName: "Joined On",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => deleteUserHandler(params.id)}>
          <AiOutlineDelete size={20} className="text-red-500" />
        </Button>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role || "User",
    createdAt: user.createdAt?.slice(0, 10),
  }));

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Users
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

export default AllUsers;
