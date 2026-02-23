import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import ClaimViewModal from "./ClaimViewModal";

const ClaimCard = ({ claim }) => {
  const [viewClaim, setViewClaim] = useState(null);

  const itemName =
    claim.itemId?.itemName || claim.itemSnapshot?.itemName || "Unknown Item";
  const dateStr = new Date(claim.createdAt).toLocaleString();

  const handleDelete = async () => {
    try {
      await axios.delete(`${server}/claim/delete/${claim._id}`, {
        withCredentials: true,
      });
      toast.success("Claim deleted.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete claim");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 border flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <div className="w-full sm:w-20 h-40 sm:h-20 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden border">
        {claim.itemId?.images?.[0]?.url ? (
          <img
            src={claim.itemId.images[0].url}
            alt="thumb"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">🕒</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">
              {itemName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Submitted: {dateStr}
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <StatusBadge status={claim.status} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setViewClaim(claim)}
            className="px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-50"
          >
            View →
          </button>

          {viewClaim && (
            <ClaimViewModal
              claim={viewClaim}
              onClose={() => setViewClaim(null)}
            />
          )}

          {claim.status === "pending" && (
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimCard;
