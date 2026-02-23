// src/components/claims/StatusBadge.jsx
import React from "react";

const STATUS_MAP = {
  pending: { label: "Pending Review", className: "bg-yellow-100 text-yellow-800" },
  awaiting_admin: { label: "Awaiting Admin", className: "bg-blue-100 text-blue-800" },
  approved: { label: "Approved", className: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || { label: status || "Unknown", className: "bg-gray-100 text-gray-700" };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.className} border`}>
      {s.label}
    </span>
  );
};

export default StatusBadge;
