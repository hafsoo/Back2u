import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import LostFoundDetails from "../components/Route/ReportDetailPage/LostFoundDetails";
import { useSelector } from "react-redux";

const LostFoundDetailPage = () => {
  const { lostItems } = useSelector((state) => state.lostItem);
  const { foundItems } = useSelector((state) => state.foundItem);
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!lostItems || !foundItems) return; // wait until arrays exist new
    // First, look for the item in Redux state
    const item =
      lostItems.find((i) => i._id === id) ||
      foundItems.find((i) => i._id === id) ||
      null;

    setData(item);
  }, [lostItems, foundItems, id]);

  return (
    <div>
      <Header />
      {data ? (
        <LostFoundDetails data={data} />
      ) : (
        <p className="text-center mt-20">Loading...</p>
      )}
      <Footer />
    </div>
  );
};

export default LostFoundDetailPage;
