import React from "react";
//import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="Home"
      className={`w-full min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-10 bg-gradient-to-r from-[#f8fbff] to-[#e8f0ff]`}

    >
      {/* Left Side: Text Section */}
      <div 
       className="md:w-1/2 text-center md:text-left"
       >
        <h1 className="text-[36px] md:text-[56px] font-[700] leading-tight text-[#1f2937]">
          Lost Something? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#f97316]">
            We’ll Help You
          </span>{" "}
          <br />
          Find It
        </h1>

        <p className="mt-5 text-[16px] text-gray-600 font-[400] leading-relaxed">
          Back2U uses AI-powered image recognition to match lost and found items
          on your university campus. Report, search, and recover your belongings
          faster than ever.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
          <Link to="/report-lost">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all">
              Report Lost Item
            </button>
          </Link>

          <Link to="/report-found">
            <button className="bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 px-6 py-3 rounded-lg font-medium shadow-md transition-all">
              Report Found Item
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img
          src="/images/unii.png"
          alt="Students using Back2U app"
          className="rounded-2xl shadow-lg w-[95%] md:w-[80%] object-cover"
          

        />
      </div>
    </div>
  );
};

export default Hero;
