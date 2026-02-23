import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createLostItem, clearMessage } from "../../redux/actions/lostItem"; // Your Redux action
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MatchPopup from "../Matching/MatchPopup";
const LostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    success,
    error,
    possibleMatches = [],
  } = useSelector((state) => state.lostItem);

  const [showPopup, setShowPopup] = useState(false); //

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    dateLost: "",
    location: "",
    customLocation: "",
    description: "",
    images: [],
  });

  const handleClosePopup = () => {
    setShowPopup(false); // hide popup
    dispatch(clearMessage()); // optional: clear matches from Redux
    navigate("/");
  };

  // Handle toast notifications
  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Lost item report submitted successfully!");
      //navigate("/");
      //window.location.reload();
      setFormData({
        itemName: "",
        category: "",
        dateLost: "",
        location: "",
        customLocation: "",
        description: "",
        images: [],
      });
      setTimeout(() => {
        setShowPopup(true);
      }, 400);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, reader.result],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //const { itemName, dateLost, location, images } = formData;
    const {
      itemName,
      dateLost,
      location,
      category,
      description,
      customLocation,
    } = formData;
    //if (!itemName || !dateLost || !location || images.length === 0) {
    //  return toast.error(
    //   "Please fill all required fields and upload at least one image.",
    //);
    // }
    if (
      !itemName ||
      !dateLost ||
      !location ||
      !category ||
      !description ||
      !customLocation
    ) {
      return toast.error("Please fill all required fields.");
    }
    dispatch(createLostItem(formData));
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg">
      {/* Info message at the top */}
      <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded-md mb-4">
        <span className="mr-2 text-xl">⚠️</span>
        <p className="text-sm">
          Please provide correct and valid details in all fields. Upload clear
          images of the lost item for better matching results.
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        Report Lost Item
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" required>
              Select Category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Books">Books</option>
            <option value="Bags">Bags</option>
            <option value="Wallet / Purse">Wallet / Purse</option>
            <option value="ID Card">ID Card</option>
            <option value="Keys">Keys</option>
            <option value="Stationery">Stationery</option>
            <option value="Sports Equipment">Sports Equipment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date Lost */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Lost
          </label>
          <input
            type="date"
            name="dateLost"
            value={formData.dateLost}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            required
          >
            <option value="">Select Location</option>
            <option value="Library">Library</option>
            <option value="Cafeteria">Cafeteria</option>
            <option value="Main Building">Main Building</option>
            <option value="IT Department">IT Department</option>
            <option value="Science Block">Science Block</option>
            <option value="Sports Complex">Sports Complex</option>
            <option value="Parking Area">Parking Area</option>
            <option value="Hostel A">Hostel A</option>
            <option value="Hostel B">Hostel B</option>
            <option value="Admin Office">Admin Office</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Playground">Playground</option>
            <option value="Bus Stop">Bus Stop</option>
            <option value="Garden">Garden</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="customLocation"
            value={formData.customLocation || ""}
            onChange={handleChange}
            required
            placeholder="Or type a specific place (e.g., Library 2nd Floor)"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the item"
            rows="3"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleChange}
            multiple
            className="hidden"
            id="upload"
          />
          <div className="flex flex-wrap items-center mt-2">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={30}
                color="#555"
                className="cursor-pointer"
              />
            </label>
            {formData.images.map((img, idx) => (
              <img
                src={img}
                key={idx}
                alt={`lost-item-${idx}`}
                className="h-[120px] w-[120px] object-cover m-2 border rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Report
          </button>
        </div>
      </form>

      {/* Matching Popup */}
      {showPopup && (
        <MatchPopup matches={possibleMatches} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default LostForm;
