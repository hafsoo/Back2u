import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";
import { MapPin, Tag, Calendar } from "lucide-react";
import { toast } from "react-toastify"; 

const AdminClaimDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);

  const fetchClaim = async () => {
    const { data } = await axios.get(`${server}/claim/admin-single/${id}`, {
      withCredentials: true,
    });
    setClaim(data.claim);
  };

  useEffect(() => {
    fetchClaim();
  }, []);

  // ================= START ADMIN CHAT =================
const handleAdminChat = async () => {
  try {
    const res = await axios.post(
      `${server}/conversation/create`,
      {
        itemId: claim.itemId,
        itemType: claim.itemType,
        receiverId: claim.claimant._id, // 👈 IMPORTANT
      },
      { withCredentials: true }
    );

    navigate(`/inbox?conversation=${res.data.conversation._id}`);
  } catch (err) {
    console.log(err);
    alert(err?.response?.data?.message || "Unable to start chat");
  }
};
// ====================================================


 const updateStatus = async (status) => {
  try {
    const { data } = await axios.put(
      `${server}/claim/admin-update/${id}`,
      { status },
      { withCredentials: true }
    );

    // Update local claim state so UI re-renders
    setClaim((prev) => ({ ...prev, status }));

    // Show toast notification
    toast.success(`Claim ${status} successfully!`);

    // Optional: navigate after 2 seconds
    setTimeout(() => {
      navigate("/admin-claims");
    }, 2000);

  } catch (error) {
    console.error(error);
    toast.error("Failed to update claim!");
  }
};


  if (!claim)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-pulse text-gray-600 text-lg">
          Loading claim details...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Claim Review
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">
            {/* ITEM CARD */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {claim.itemSnapshot?.images?.length > 0 && (
                <img
                  src={claim.itemSnapshot.images[0]?.url}
                  alt="item"
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {claim.itemSnapshot?.itemName}
                </h3>

                {/* Status Badge */}
                <span
                  className={`inline-block px-4 py-1 text-sm rounded-full font-medium ${
                    claim.itemSnapshot?.status === "lost"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {claim.itemSnapshot?.status}
                </span>

                {/* Info */}
                <div className="space-y-3 text-gray-700 pt-3">
                  <p className="flex items-center gap-2">
                    <Tag size={18} />
                    <strong>Category:</strong>
                    {claim.itemSnapshot?.category}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={18} />
                    <strong>Location:</strong>
                    {claim.itemSnapshot?.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={18} />
                    <strong>
                      {claim.itemSnapshot?.status === "lost"
                        ? "Date Lost:"
                        : "Date Found:"}
                    </strong>
                    {claim.itemSnapshot?.dateLost ||
                      claim.itemSnapshot?.dateFound}
                  </p>

                  <div>
                    <strong>Description:</strong>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      {claim.itemSnapshot?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CLAIM ANSWERS */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Verification Answers
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="font-medium">{claim.answers?.color}</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-500">Unique Marks</p>
                  <p className="font-medium">{claim.answers?.marks}</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 col-span-full">
                  <p className="text-sm text-gray-500">Proof</p>
                  <p className="font-medium">
                    {claim.answers?.proof || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* CLAIMANT INFO */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                Claimant Info
              </h4>
              <p className="text-gray-700">
                <strong>Name:</strong> {claim.claimant?.name}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {claim.claimant?.email}
              </p>
            </div>

            {/* CHAT PLACEHOLDER */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h4 className="font-semibold text-blue-800 mb-2">
                Chat & Verification
              </h4>
              <p className="text-sm text-blue-700">
                Communicate with claimant before approval. This improves trust
                and reduces fraud.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            {claim.status === "awaiting_admin" && (
              <div className="bg-white rounded-2xl shadow border p-6 space-y-3">
                <button
                  onClick={handleAdminChat}
                  className="w-full py-3 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Start Chat with Claimant
                </button>
                <button
                  onClick={() => updateStatus("approved")}
                  className="w-full py-3 rounded-xl font-medium bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Approve Claim
                </button>

                <button
                  onClick={() => updateStatus("rejected")}
                  className="w-full py-3 rounded-xl font-medium border border-red-500 text-red-600 hover:bg-red-50 transition"
                >
                  Reject Claim
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClaimDetails;
