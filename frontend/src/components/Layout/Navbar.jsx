import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ active: propActive = 1, scrolled = false, isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(propActive);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      navItems.forEach((item, index) => {
        if (item.url.startsWith("#")) {
          const section = document.getElementById(item.url.replace("#", ""));
          if (
            section &&
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
          ) {
            setActive(index + 1);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, url, index) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      setActive(index + 1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(url.replace("#", ""))?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
      } else {
        document.getElementById(url.replace("#", ""))?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav className={isMobile ? "flex flex-col w-full" : "flex justify-center"}>
      {navItems.map((item, index) => {
        const isActive = active === index + 1;
        return (
          <Link
            key={index}
            to={item.url.startsWith("#") ? location.pathname : item.url}
            onClick={(e) => handleNavClick(e, item.url, index)}
            className={`px-4 py-3 font-medium transition-all duration-200
              ${isActive ? "text-[#17dd1f]" : "text-gray-800 hover:text-[#17dd1f]"}
              ${isMobile ? "border-b border-gray-200" : ""}
            `}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
