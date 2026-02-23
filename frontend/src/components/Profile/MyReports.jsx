import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const MyReports = () => {
  const [lostReports, setLostReports] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const lostRes = await axios.get(`${server}/lost/my-lost-items`, { withCredentials: true });
      const foundRes = await axios.get(`${server}/found/my-found-items`, { withCredentials: true });

      setLostReports(lostRes.data.myItems || []);
      setFoundReports(foundRes.data.foundItems || []);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch reports");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const url =
        type === "lost"
          ? `${server}/lost/delete-lost-item/${id}`
          : `${server}/found/delete-found-item/${id}`;
      await axios.delete(url, { withCredentials: true });
      toast.success(`${type === "lost" ? "Lost" : "Found"} report deleted`);
      type === "lost"
        ? setLostReports(lostReports.filter((item) => item._id !== id))
        : setFoundReports(foundReports.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(`Failed to delete ${type} report`);
    }
  };

  const renderTable = (reports, type) => (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#6a5fdf] text-[#d0d2d6] uppercase text-xs sm:text-sm">
          <tr>
            <th className="py-3 px-2 sm:px-4 border">No</th>
            <th className="py-3 px-2 sm:px-4 border">Name</th>
            <th className="py-3 px-2 sm:px-4 border hidden sm:table-cell">Category</th>
            <th className="py-3 px-2 sm:px-4 border">Location</th>
            <th className="py-3 px-2 sm:px-4 border hidden sm:table-cell">Date</th>
            <th className="py-3 px-2 sm:px-4 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, i) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="py-2 px-2 sm:px-4 border">{i + 1}</td>
              <td className="py-2 px-2 sm:px-4 border font-medium text-gray-800">{item.itemName}</td>
              <td className="py-2 px-2 sm:px-4 border hidden sm:table-cell">{item.category || "N/A"}</td>
              <td className="py-2 px-2 sm:px-4 border">{item.location}</td>
              <td className="py-2 px-2 sm:px-4 border hidden sm:table-cell">{item.dateLost || item.dateFound}</td>
              <td className="py-2 px-2 sm:px-4 border">
                <div className="flex justify-center sm:justify-start gap-2">
                  <Link
                    to={`/lost-found/${item._id}`}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                    title="View"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={type === "lost" ? `/lost-report/edit/${item._id}` : `/found-report/edit/${item._id}`}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id, type)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#3a24db]">My Lost Reports</h2>
      {lostReports.length === 0 ? <p className="text-gray-600">You have no lost reports yet.</p> : renderTable(lostReports, "lost")}

      <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4 text-[#3a24db]">My Found Reports</h2>
      {foundReports.length === 0 ? <p className="text-gray-600">You have no found reports yet.</p> : renderTable(foundReports, "found")}
    </div>
  );
};

export default MyReports;
