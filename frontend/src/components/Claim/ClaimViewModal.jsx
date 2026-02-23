import React from "react";
import { ShieldCheck, X } from "lucide-react";

const ClaimViewModal = ({ claim, onClose }) => {
  if (!claim) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl animate-[fadeIn_0.2s_ease] max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Claim Details</h2>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black transition" />
          </button>
        </div>

        <div className="border-b mb-4"></div>

        {/* Body */}
        <div className="space-y-3">
          <InfoRow
            label="Item"
            value={
              claim.itemId?.itemName || claim.itemSnapshot?.itemName || "—"
            }
          />
          <InfoRow label="Color" value={claim.answers?.color || "—"} />
          <InfoRow
            label="Special Marks"
            value={claim.answers?.marks || "—"}
            multiline
          />
          <InfoRow
            label="Proof"
            value={claim.answers?.proof || "No proof"}
            multiline
          />
          <InfoRow
            label="Status"
            // value={claim.status}
            value={
              claim.status === "awaiting_admin"
                ? "Awaiting Admin Review"
                : claim.status.charAt(0).toUpperCase() + claim.status.slice(1)
            }
          />
          <InfoRow
            label="Submitted"
            value={new Date(claim.createdAt).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
};

// Updated InfoRow to support multiline values
const InfoRow = ({ label, value, multiline }) => (
  <div className="border-b pb-2">
    <p className="text-gray-600 font-semibold">{label}</p>
    <p
      className={`mt-1 font-medium ${multiline ? "whitespace-pre-wrap break-words" : ""}`}
    >
      {value}
    </p>
  </div>
);

export default ClaimViewModal;
