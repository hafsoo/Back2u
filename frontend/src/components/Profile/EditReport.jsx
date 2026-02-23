import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const EditReport = () => {
  const { item_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    itemName: "",
    category: "",
    location: "",
    customLocation: "",
    dateLost: "",
    description: "",
    images: [],
  });

  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          `${server}/lost/get-all-lost-items`,
          { withCredentials: true }
        );
        const found = data.lostItems.find((r) => r._id === item_id);
        if (found) setReport(found);
        else toast.error("Report not found!");
      } catch (err) {
        toast.error("Failed to load report details");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [item_id]);

  // Handle input changes
  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/lost/update-lost-item/${item_id}`,
        report,
        { withCredentials: true }
      );
      toast.success("Report updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update report");
    }
  };

  // Update single image using Base64
  const handleImageChange = async (index, file) => {
    try {
      // Convert file to Base64
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(file);

      const { data } = await axios.put(
        `${server}/lost/update-lost-item-image`,
        {
          itemId: item_id,
          imageIndex: index,
          newImage: base64Image,
        },
        { withCredentials: true }
      );

      toast.success("Image updated successfully!");
      setReport(data.item); // update state with new image URLs
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update image");
    }
  };

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-[#3a24db] mb-6 text-center">
          Edit Lost Report
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Name */}
          <div>
            <label className="block mb-1 font-medium">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={report.itemName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={report.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={report.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
              required
            />
          </div>

          {/* Custom Location */}
          <div>
            <label className="block mb-1 font-medium">Custom Location</label>
            <input
              type="text"
              name="customLocation"
              value={report.customLocation}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
            />
          </div>

          {/* Date Lost */}
          <div>
            <label className="block mb-1 font-medium">Date Lost</label>
            <input
              type="date"
              name="dateLost"
              value={report.dateLost ? report.dateLost.split("T")[0] : ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={report.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3a24db]"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Images */}
          {report.images && report.images.length > 0 && (
            <div>
              <label className="block mb-2 font-medium">Images</label>
              <div className="flex gap-4 flex-wrap">
                {report.images.map((img, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={img.url}
                      alt="Lost item"
                      className="w-32 h-32 object-cover rounded shadow"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#3a24db] text-white px-6 py-2 rounded hover:bg-[#3220b5] transition-colors duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditReport;
