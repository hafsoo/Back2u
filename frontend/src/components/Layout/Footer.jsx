import React from "react";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      {/* Main Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:px-8 px-5 py-16 sm:text-center">
        {/* Logo + About */}
        <div className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="/images/logoo.png"
            alt="Back2U"
            className="h-[100px] w-[150px] mb-4"
          />
          <p className="text-sm leading-relaxed text-gray-600">
            AI-powered lost & found platform for university campuses. Never lose
            anything again.Free. Trusted. Fast.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <AiFillFacebook
              size={25}
              className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
            />
            <AiOutlineTwitter
              size={25}
              className="cursor-pointer text-gray-500 hover:text-sky-500 transition"
            />
            <AiFillInstagram
              size={25}
              className="cursor-pointer text-gray-500 hover:text-pink-500 transition"
            />
            <AiFillYoutube
              size={25}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition"
            />
          </div>
        </div>

        {/* Platform Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-3 font-semibold text-gray-800">PLATFORM</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-500 hover:text-teal-500 duration-300 text-sm leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

  

        {/* Support Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-3 font-semibold text-gray-800">Support</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-500 hover:text-teal-500 duration-300 text-sm leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* contact Links */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-3 font-semibold text-gray-800">CONTACT</h1>
          {footerProductLinks.map((link) => {
    const Icon = link.icon;
    return (
      <li key={link.name} className="flex items-center justify-center sm:justify-start gap-2">
        <Icon className="text-teal-500" size={18} />
        <Link
          to={link.link}
          className="text-gray-500 hover:text-teal-500 duration-300 text-sm leading-6"
        >
          {link.name}
        </Link>
      </li>
    );
  })}
        </ul>
      </div>

      {/* Bottom Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center text-gray-500 text-sm border-t border-gray-200 pt-6 pb-8">
        <span>© 2026 Back2U. All rights reserved.</span>
        <span className="space-x-1">
          <Link to="#">Terms</Link>
          <span>·</span>
          <Link to="#">Privacy Policy</Link>
        </span>
        <div className="flex items-center justify-center">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Payment methods"
            className="h-[25px]"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
