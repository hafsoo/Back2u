import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { CheckCircle, Clock, Users, BarChart3 } from "lucide-react";
import axios from "axios";
import { server } from "../../server";

const StatsSection = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get(`${server}/statistics/dashboard-stats`, {
        withCredentials: true,
      });

      setStats(data.stats);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const dashboardStats = [
    {
      title: "Items Reported",
      value: stats.totalReported,
      subtitle: "Total reports this semester",
      icon: <BarChart3 className="text-indigo-600" />,
      color: "bg-indigo-50",
    },
    {
      title: "Items Returned",
      value: stats.returnedItems,
      subtitle: "Successfully reunited",
      icon: <CheckCircle className="text-green-600" />,
      color: "bg-green-50",
    },
    {
      title: "Avg. Response",
      value: `${stats.avgResponse}h`,
      subtitle: "Faster than ever",
      icon: <Clock className="text-amber-600" />,
      color: "bg-amber-50",
    },
    {
      title: "Active Students",
      value: stats.activeUsers,
      subtitle: "Using Back2U this year",
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((item, index) => (
        <StatsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default StatsSection;