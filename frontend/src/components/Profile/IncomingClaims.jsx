// src/pages/IncomingClaims.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const IncomingClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/claim/incoming-claims`, {
        withCredentials: true,
      });
      setClaims(data.claims || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load incoming claims");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const finderApprove = async (claimId) => {
    try {
      await axios.put(
        `${server}/claim/finder-approve/${claimId}`,
        {},
        { withCredentials: true },
      );
      // toast.success("Approved — awaiting admin review");
      toast.success("Claim approved successfully");
      fetchClaims();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to approve");
    }
  };

  const finderReject = async (claimId) => {
    try {
      await axios.put(
        `${server}/claim/finder-reject/${claimId}`,
        {},
        { withCredentials: true },
      );
      toast.success("Claim rejected");
      fetchClaims();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reject");
    }
  };

  const startChat = (claim) => {
    window.location.href = `/inbox?chat=${claim.claimant._id}`;
  };

  if (loading) return <div>Loading...</div>;

  if (!claims.length)
    return <div className="p-4 sm:p-6">No incoming claims right now.</div>;
//new for admin
  const finderEscalate = async (claimId) => {
  try {
    await axios.put(
      `${server}/claim/finder-escalate/${claimId}`,
      {},
      { withCredentials: true }
    );
    toast.success("Claim sent to admin for review");
    fetchClaims();
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to escalate");
  }
};




  return (
    <div className="space-y-4 p-4 sm:p-6">
    <div>
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <span className="inline-block p-2 bg-blue-50 rounded-full">
              {/* bell icon simple */}
              🔔
            </span>
            Incoming Claims
          </h1>
          <p className="text-sm text-gray-500 mt-1">Review ownership requests for your found items. Verify details and choose to accept, reject, or forward the claim to admin.</p>
        </div>
    <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded-md mb-4">
        <span className="mr-2 text-xl">⚠️</span>
        <p className="text-sm">
         If you are unsure about this claim, you can escalate it to admin for final decision.
        </p>
      </div>
      {claims.map((claim) => (
        <div
          key={claim._id}
          className="bg-white shadow rounded p-4 flex flex-col sm:flex-row gap-4"
        >
          {/* Image */}
          <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 overflow-hidden rounded">
            <img
              src={claim.itemId?.images?.[0]?.url || "/placeholder.png"}
              alt="item"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold">
              {claim.itemSnapshot?.itemName || claim.itemId?.itemName || "Item"}
            </h3>

            <p className="text-sm text-gray-600">
              Claim by: {claim.claimant?.name || "User"}
            </p>

            <div className="mt-2 text-sm">
              <p>
                <strong>Color:</strong> {claim.answers?.color}
              </p>
              <p>
                <strong>Marks:</strong> {claim.answers?.marks}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Submitted: {new Date(claim.createdAt).toLocaleString()}
            </p>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => finderApprove(claim._id)}
                className="px-3 py-1 rounded bg-green-600 text-white text-sm"
              >
                Approve
              </button>

              <button
                onClick={() => finderReject(claim._id)}
                className="px-3 py-1 rounded bg-red-600 text-white text-sm"
              >
                Reject
              </button>
{/**new button when finder accept claim accept if finder no decide goes to admin */}
              <button
                onClick={() => finderEscalate(claim._id)}
                className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
              >
                Escalate to Admin
              </button>

              <button
                onClick={() => startChat(claim)}
                className="px-3 py-1 rounded border text-sm"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomingClaims;
