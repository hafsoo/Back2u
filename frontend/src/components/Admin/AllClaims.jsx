import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";


const statusStyle = {
  approved: "text-green-600 font-semibold",
  rejected: "text-red-500 font-semibold",
  pending: "text-yellow-500 font-semibold",
  awaiting_admin: "text-orange-500 font-semibold",
};

const AllClaims = () => {
  const [claims, setClaims] = useState([]);
  const navigate=useNavigate();

  const fetchClaims = async () => {
    const { data } = await axios.get(
      `${server}/claim/admin-all-claims`,
      { withCredentials: true }
    );
    setClaims(data.claims);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `${server}/claim/admin-update/${id}`,
      { status },
      { withCredentials: true }
    );
    fetchClaims();
  };

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">All Claims</h2>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full  min-w-[700px] border-collapse">
          <thead>
            <tr className="text-left border-b bg-gray-50 text-sm">
              <th className="p-2 sm:p-4">Claim ID</th>
              <th className="p-2 sm:p-4">Item</th>
              <th className="p-2 sm:p-4">Claimant</th>
              <th className="p-2 sm:p-4">Item Type</th>
              <th className="p-2 sm:p-4">Status</th>
              <th className="p-2 sm:p-4">Actions</th>
              <th className="p-2 sm:p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {claims.map((claim, i) => (
              <tr
                key={claim._id}
                className={`border-b text-sm sm:text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4">{claim._id}</td>

                <td className="p-4">
                  {claim.itemSnapshot?.itemName || "N/A"}
                </td>

                <td className="p-4">
                  {claim.claimant?.name || "User"}
                </td>

                <td className="p-4">{claim.itemType}</td>

                <td className={`p-4 ${statusStyle[claim.status]}`}>
                  {claim.status.replace("_", " ")}
                </td>
{/** 
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      disabled={claim.status !== "awaiting_admin"}
                      onClick={() =>
                        updateStatus(claim._id, "approved")
                      }
                      className={`px-3 py-1 rounded text-white text-xs
                        ${
                          claim.status === "awaiting_admin"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      APPROVE
                    </button>

                    <button
                      disabled={claim.status !== "awaiting_admin"}
                      onClick={() =>
                        updateStatus(claim._id, "rejected")
                      }
                      className={`px-3 py-1 rounded text-white text-xs
                        ${
                          claim.status === "awaiting_admin"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      REJECT
                    </button>
                  </div>
                </td>
*/}
<td className="p-4">
  <button
    onClick={() => navigate(`/admin/claim/${claim._id}`)}
    className="px-2 py-1 sm:px-3 sm:py-1 rounded text-white text-xs bg-blue-600 hover:bg-blue-700"
  >
    VIEW
  </button>
</td>

                <td className="p-4">
                  {claim.createdAt?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClaims;
