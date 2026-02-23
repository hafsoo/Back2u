import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { server } from "../../server";

const Header = ({ activeHeading }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchTimeout = useRef(null);

  const TOP_HEADER_HEIGHT = 64;
  const NAV_HEIGHT = 70;
  const COMBINED_HEIGHT = TOP_HEADER_HEIGHT + NAV_HEIGHT;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      if (!term.trim()) {
        setSearchData([]);
        return;
      }
      try {
        const res = await fetch(
          `${server}/search?q=${encodeURIComponent(term)}`
        );
        const data = await res.json();
        if (data.success) setSearchData(data.results);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);
  };

  const handleSelectItem = (id) => {
    navigate(`/lost-found/${id}`);
    setSearchTerm("");
    setSearchData([]);
  };

  return (
    <>
      {/* MAIN HEADER */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          scrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur"
            : "relative bg-white"
        }`}
      >
        {/* ---------------- MOBILE HEADER ---------------- */}
        <div className="lg:hidden flex items-center justify-between w-full px-4 py-3 relative">
          <button onClick={() => setOpen(true)}>
            <BiMenuAltLeft size={32} className="text-gray-700" />
          </button>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <img
              src="/images/logoo.png"
              alt="Back2U"
              className="h-[60px] w-[130px] object-contain"
            />
          </Link>

          {isAuthenticated ? (
            <Link to="/profile">
              <img
                src={user?.avatar?.url || "/images/default-avatar.png"}
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/login">
              <CgProfile size={30} className="text-gray-700" />
            </Link>
          )}
        </div>

        {/* ---------------- DESKTOP HEADER ---------------- */}
        <div className="hidden lg:flex items-center justify-between px-10 py-3 h-[96px]">
          {/* Logo */}
          <Link to="/">
            <img
              src="/images/logoo.png"
              alt="Back2U"
              className="h-[100px] w-[120px] object-contain hover:scale-105 transition"
            />
          </Link>

          {/* Search */}
          <div className="relative flex-1 mx-12 max-w-2xl">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="
                h-11 w-full px-4 pr-10
                border border-blue-400
                rounded-xl
                bg-gray-50
                focus:bg-white
                focus:ring-2 focus:ring-blue-500
                focus:outline-none
                transition
              "
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            {searchData.length > 0 && (
              <div
                className="
                  absolute left-0 right-0 z-50 mt-3
                  bg-white rounded-xl
                  border border-gray-100
                  shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                  max-h-72 overflow-auto p-2
                "
              >
                {searchData.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleSelectItem(item._id)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <img
                      src={item.images?.[0]?.url || "/images/default-avatar.png"}
                      className="w-10 h-10 rounded-md object-cover"
                      alt="item"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.itemName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.type} item
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/browse"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition flex items-center"
            >
              Browse Items <IoIosArrowForward className="ml-1" />
            </Link>

            {isAuthenticated ? (
              <Link to="/profile">
                <img
                  src={user?.avatar?.url || "/images/default-avatar.png"}
                  className="w-11 h-11 rounded-full border-2 border-blue-500 object-cover hover:ring-2 hover:ring-blue-400 transition"
                  alt="profile"
                />
              </Link>
            ) : (
              <Link to="/login">
                <CgProfile size={32} className="text-gray-700" />
              </Link>
            )}
          </div>
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="hidden lg:block border-t border-gray-100">
          <div className={`${styles.section} flex justify-center h-[70px]`}>
            <Navbar active={activeHeading} scrolled={scrolled} />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: scrolled ? COMBINED_HEIGHT : 0 }} />

      {/* ---------------- MOBILE SIDEBAR ---------------- */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-3/4 max-w-xs h-full bg-white p-5 shadow-lg">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <RxCross1 size={22} />
              </button>
            </div>

            <Navbar active={activeHeading} isMobile />

            <Link
              to="/browse"
              className="block mt-6 py-2 rounded-xl bg-blue-600 text-white text-center"
            >
              Browse Items
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
