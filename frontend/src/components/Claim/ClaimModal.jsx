import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const ClaimModal = ({ item, itemType, onClose }) => {
  const [color, setColor] = useState("");
  const [marks, setMarks] = useState("");
  const [proof, setProof] = useState("");
  const [loading, setLoading] = useState(false);

  if (!item || !item._id) return null;

  const submitClaim = async () => {
    if (!color.trim() || !marks.trim()) {
      toast.error("Please enter the color and unique marks to verify ownership.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${server}/claim/submit-claim`,
        {
          itemId: item._id,
          itemType,
          color: color.trim(),
          marks: marks.trim(),
          proof: proof?.trim() || "",
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Claim submitted successfully!");
      onClose();
    } catch (err) {
      console.log("Claim Error:", err.response?.data || err.message);
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 animate-[fadeIn_0.2s_ease-out]">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Claim Item
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Answer the questions below to verify ownership of this item.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is the exact color/shade?
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none"
              placeholder="e.g. Dark navy blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Any unique marks or features?
            </label>
            <textarea
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none resize-none"
              placeholder="Describe scratches, stickers, engravings, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional proof (optional)
            </label>
            <textarea
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none resize-none"
              placeholder="Any additional details to support your claim"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-1/2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            Close
          </button>

          <button
            onClick={submitClaim}
            disabled={loading || !color.trim() || !marks.trim()}
            className="w-full sm:w-1/2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClaimModal;
