import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../../server";
import {
  MapPin,
  Tag,
  Calendar,
  ArrowLeft,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ClaimModal from "../../Claim/ClaimModal";

const LostFoundDetails = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [selected, setSelected] = useState(0);
  const [openClaim, setOpenClaim] = useState(false);

  // ================= START CHAT =================
  const handleStartChat = async () => {
    try {
      // 🔐 Must be logged in
      if (!user?._id) {
        alert("Please login to start chat");
        return;
      }

      // 🚫 Owner cannot chat with own item
      if (user._id === data?.reportedBy?._id) {
        alert("You cannot chat with yourself");
        return;
      }

      const res = await axios.post(
        `${server}/conversation/create`,
        {
          itemId: data._id,
          itemType: data.status === "lost" ? "LostItem" : "FoundItem",
        },
        { withCredentials: true },
      );

      // ✅ Redirect to inbox
      navigate(`/inbox?conversation=${res.data.conversation._id}`);
    } catch (err) {
      console.error("Chat error:", err);
      alert(err?.response?.data?.message || "Unable to start chat");
    }
  };
  // =================================================

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-5"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE - IMAGE */}
        <div className="lg:w-1/2">
          <img
            src={data?.images[selected]?.url}
            className="w-full h-[350px] object-cover rounded-xl shadow"
            alt="item"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3">
            {data?.images.map((img, index) => (
              <img
                key={index}
                alt="thumb"
                src={img.url}
                onClick={() => setSelected(index)}
                className={`h-20 w-20 rounded-lg object-cover cursor-pointer border 
                ${selected === index ? "border-blue-500" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="lg:w-1/2 p-6 rounded-xl shadow-md border bg-white">
          <h2 className="text-3xl font-semibold text-gray-900">
            {data.itemName}
          </h2>

          {/* Status */}
          <div className="mt-2">
            <span
              className={`px-4 py-1 rounded-full text-white text-sm capitalize ${
                data.status === "lost" ? "bg-yellow-600" : "bg-green-600"
              }`}
            >
              {data.status}
            </span>
          </div>

          {/* Info */}
          <div className="mt-5 text-gray-700 space-y-3">
            <p className="flex items-center gap-2">
              <Tag size={18} />
              <strong>Category:</strong> {data.category}
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={18} />
              <strong>Location:</strong> {data.location}
            </p>

            <p className="flex items-center gap-2">
              <Calendar size={18} />
              <strong>
                {data.status === "lost" ? "Date Lost:" : "Date Found:"}
              </strong>
              {data.status === "lost" ? data.dateLost : data.dateFound}
            </p>

            <p>
              <strong>Description:</strong>
              <br />
              {data.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-col gap-3">
            {/* ACTION BUTTONS 
           <button
              onClick={() => setOpenClaim(true)}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Claim This Item
            </button>
            */}

            {/* Only show claim button for Found items */}
            {data.type === "FoundItem" && data.status === "found" &&(
              <button
                onClick={() => setOpenClaim(true)}
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Claim This Item
              </button>
            )}

            {openClaim && (
              <ClaimModal
                item={data}
                itemType={data.status === "lost" ? "LostItem" : "FoundItem"}
                onClose={() => setOpenClaim(false)}
              />
            )}

            {/* 🔒 CHAT BUTTON (HIDDEN FOR OWNER) */}
            {user?._id !== data?.reportedBy?._id && (
              <button
                onClick={handleStartChat}
                className="flex justify-center items-center gap-2 border py-3 rounded-lg hover:bg-gray-100"
              >
                <Phone size={18} />
                Chat with {data.status === "lost" ? "Finder" : "Owner"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div className="p-6 bg-white shadow rounded-xl border">
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        <div className="p-6 bg-blue-50 border border-blue-200 shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <ShieldCheck size={20} /> Verification Required
          </h3>
          <p className="text-gray-700 text-sm">
            Your claim will be reviewed by the finder of the item. The finder can accept or reject your request. If additional verification is needed, the claim will be forwarded to the admin for final approval before handover.
          </p>
        </div>
      </div>

      {/* REPORT INFO */}
      <div className="mt-10 p-6 bg-white shadow rounded-xl border max-w-xl">
        <h3 className="text-xl font-semibold mb-3">Report Information</h3>

        <p className="text-gray-700">
          <strong>Reported by:</strong>{" "}
          {data?.reportedBy?.name || "Unknown User"}
        </p>

        <p className="text-gray-700">
          <strong>Email:</strong> {data?.reportedBy?.email || "Not Provided"}
        </p>

        <p className="text-gray-700">
          <strong>Reported on:</strong>{" "}
          {new Date(data.createdAt).toLocaleDateString()}
        </p>

        <p className="text-gray-700">
          <strong>Report ID:</strong> #{data._id}
        </p>
      </div>
    </div>
  );
};

export default LostFoundDetails;
