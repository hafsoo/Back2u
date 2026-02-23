// src/pages/MyClaims.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClaimCard from "../Claim/ClaimCard";
import { getMyClaims } from "../../redux/actions/claim";
import { FiPlus } from "react-icons/fi"

const TABS = [
  { key: "all", label: "All Claims" },
  { key: "pending", label: "Pending" },
  { key: "awaiting_admin", label: "Awaiting Admin" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const MyClaims = () => {
  const dispatch = useDispatch();
  const { claims = [], loading, error } = useSelector((state) => state.claims || {});
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
  // dispatch your action to load user's claims
    dispatch(getMyClaims());
  }, [dispatch]);

  // counts for each tab
  const counts = useMemo(() => {
    const c = { all: claims.length, pending: 0, awaiting_admin: 0, approved: 0, rejected: 0 };
    claims.forEach((cl) => {
      const s = cl.status;
      if (s === "pending") c.pending++;
      else if (s === "awaiting_admin") c.awaiting_admin++;
      else if (s === "approved") c.approved++;
      else if (s === "rejected") c.rejected++;
    });
    return c;
  }, [claims]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return claims;
    return claims.filter((c) => c.status === activeTab);
  }, [claims, activeTab]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <span className="inline-block p-2 bg-blue-50 rounded-full">
              {/* bell icon simple */}
              🔔
            </span>
            My Claims
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track the status of your item claims</p>
        </div>

        <div>
          <button
            className="hidden lg:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => {
              window.location.href = "/found-reports";
            }}
          >
            <FiPlus className="h-4 w-4" />
            <span>New Claim</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5">
        <div className="hidden lg:flex gap-3 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
                activeTab === t.key
                  ? "bg-white border-gray-200 shadow"
                  : "bg-gray-50 border-transparent text-gray-600"
              }`}
            >
              <span>{t.label}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                {t.key === "all" ? counts.all : counts[t.key] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading && <div className="p-6 bg-white rounded shadow text-center">Loading claims...</div>}

        {!loading && filtered.length === 0 && (
          <div className="p-6 bg-white rounded shadow text-center text-gray-600">
            No claims found in this category.
          </div>
        )}

        {!loading &&
          filtered.map((claim) => (
            <ClaimCard key={claim._id} claim={claim} />
          ))}
      </div>
    </div>
  );
};

export default MyClaims;
