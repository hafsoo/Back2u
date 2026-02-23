import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLostItems } from "../redux/actions/lostItem";
import { getAllFoundItems } from "../redux/actions/foundItem";
import "./BrowseItems.css"; // optional styling file
import { useNavigate } from 'react-router-dom';

const BrowseItems = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const lostItems = useSelector((state) => state.lostItem.lostItems);
  const foundItems = useSelector((state) => state.foundItem.foundItems);
  // UI State
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("newest");
  // Fetch items on load
  useEffect(() => {
    dispatch(getAllLostItems());
    dispatch(getAllFoundItems());
  }, [dispatch]);

  // Collect all categories dynamically
const allCategories = [
    "All",
    ...new Set([...lostItems, ...foundItems].map((i) => i.category)),
  ];

  const allLocations = [
    "All",
    ...new Set([...lostItems, ...foundItems].map((i) => i.location)),
  ];

  // Merge lost + found
  let visibleItems = [
    ...lostItems.map((i) => ({ ...i, type: "lost" })),
    ...foundItems.map((i) => ({ ...i, type: "found" })),
  ];

  // Apply Tab filter
  if (tab === "lost") visibleItems = visibleItems.filter((i) => i.type === "lost");
  if (tab === "found") visibleItems = visibleItems.filter((i) => i.type === "found");

  // Search filter
  visibleItems = visibleItems.filter((i) =>
    i.itemName.toLowerCase().includes(search.toLowerCase())
  );

  // Category filter
  if (category !== "All")
    visibleItems = visibleItems.filter((i) => i.category === category);

  // Location filter
  if (location !== "All")
    visibleItems = visibleItems.filter((i) => i.location === location);

  // Sorting
  if (sort === "newest")
    visibleItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (sort === "oldest")
    visibleItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sort === "az")
    visibleItems.sort((a, b) => a.itemName.localeCompare(b.itemName));

  return (
    <div className="browse-container">

      {/* Search bar */}
      <div className="search-row">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <i className="fa fa-search search-icon"></i>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {allCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {allLocations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A → Z</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="tabs-row">
        <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>
          All Items ({lostItems.length + foundItems.length})
        </button>

        <button className={tab === "lost" ? "active" : ""} onClick={() => setTab("lost")}>
          Lost ({lostItems.length})
        </button>

        <button className={tab === "found" ? "active" : ""} onClick={() => setTab("found")}>
          Found ({foundItems.length})
        </button>
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {visibleItems.map((item) => (
          <div className="item-card" key={item._id} onClick={() => navigate(`/lost-found/${item._id}`)}>
            <img
              src={item.images?.[0]?.url}
              alt={item.itemName}
              className="item-img"
            />

            <div className="item-info">
              <h3>{item.itemName}</h3>
              <p className="small">{item.category}</p>
              <p className="small">{item.location}</p>

              <span className={`type-badge ${item.type}`}>
                {item.type.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {visibleItems.length === 0 && (
        <p className="no-results">No items match your search.</p>
      )}
    </div>
  );
};

export default BrowseItems;
