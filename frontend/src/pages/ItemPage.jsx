import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import LostFoundCard from "../components/Route/LostFound/LostFoundCard";
import { getAllLostItems } from "../redux/actions/lostItem";
import { getAllFoundItems } from "../redux/actions/foundItem";

const ItemPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lostItems = useSelector((state) => state.lostItem.lostItems);
  const foundItems = useSelector((state) => state.foundItem.foundItems);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (type === "lost") dispatch(getAllLostItems());
    else dispatch(getAllFoundItems());
  }, [type, dispatch]);

  useEffect(() => {
    // if (!lostItems || !foundItems) return; // wait until arrays exist
    setData(type === "lost" ? lostItems : foundItems);
  }, [type, lostItems, foundItems]);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data && data.length > 0 ? (
          data.map((item, idx) => {
            if (!item?._id) return null; // skip undefined items
            return (
              <div
                key={item._id}
                onClick={() => navigate(`/lost-found/${item._id}`)}
                className="cursor-pointer"
              >
                <LostFoundCard data={item} type={type} />
              </div>
            );
          })
        ) : (
          <p className="text-center w-full text-lg mt-20">No items found</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ItemPage;
