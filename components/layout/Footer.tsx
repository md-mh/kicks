"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pt-0 pb-10 px-0 w-full font-sans relative">
      {/* Newsletter Banner */}
      <div className="w-full bg-[#5865F2] rounded-t-[32px] md:rounded-t-[40px] overflow-hidden relative px-3 sm:px-8 py-9 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center justify-between max-w-7xl mx-auto relative mb-5">
          <div className="col-span-1 min-w-0">
            <h2 className="uppercase text-white font-bold text-2xl md:text-[26px] lg:text-[30px] xl:text-[34px] leading-tight mb-2 tracking-tight">
              Join our kicksplus
              <br className="hidden sm:block" /> club & get 15% off
            </h2>
            <p className="text-[13px] md:text-[15px] text-gray-200 leading-snug mb-6 mt-[2px] tracking-wide">
              Sign up for free! Join the community.
            </p>
            {/* Form */}
            <form className="flex items-center gap-2 w-full max-w-[410px] bg-white/0 rounded-lg py-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border border-white text-white placeholder:text-white/70 focus:placeholder:text-white px-4 py-[9px] rounded-lg outline-none text-sm min-w-0"
              />
              <button
                type="submit"
                className="bg-[#232321] hover:bg-black border-none text-white px-7 py-[9px] rounded-lg text-xs font-bold transition focus:outline-none"
                style={{ minWidth: 72, letterSpacing: 0.5 }}
              >
                SUBMIT
              </button>
            </form>
          </div>
          {/* Watermark logo, right upper */}
          <div className="sm:static sm:ml-8 mt-8 md:mt-0 flex items-center justify-end h-full mb-5">
            <span className="flex text-white font-extrabold select-none pointer-events-none text-[33px] font-sans tracking-tighter leading-none px-5">
              <img
                src="/logo_white.svg"
                alt="KicksPlus Logo"
                className="w-full mx-auto"
              />
              <span className="text-[#FFA833] text-[.75em] align-top relative -top-1">
                *
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer content and links */}
      <div className="bg-[#181818] sm:bg-[#1C1C1C] rounded-[32px] mt-[-32px] md:rounded-[40px] md:mt-[-40px] px-3 sm:px-8 py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-12 text-white relative h-full mb-20">
          {/* About us */}
          <div>
            <h3 className="text-[#FFA833] font-bold text-base sm:text-lg mb-2.5 tracking-tight leading-tight">
              About us
            </h3>
            <p className="text-gray-300 text-[14px] leading-snug pr-2 max-w-xs">
              We are the biggest hyperstore in the universe.
              <br />
              We got you all cover with our exclusive
              <br />
              collections and latest drops.
            </p>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-[#FFA833] font-bold text-base sm:text-lg mb-2.5 leading-tight">
              Categories
            </h3>
            <ul className="space-y-1.5 text-gray-300 text-[15px]">
              <li>Runners</li>
              <li>Sneakers</li>
              <li>Basketball</li>
              <li>Outdoor</li>
              <li>Golf</li>
              <li>Hiking</li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-[#FFA833] font-bold text-base sm:text-lg mb-2.5 leading-tight">
              Company
            </h3>
            <ul className="space-y-1.5 text-gray-300 text-[15px]">
              <li>About</li>
              <li>Contact</li>
              <li>Blogs</li>
            </ul>
          </div>
          {/* Social */}
          <div>
            <h3 className="text-[#FFA833] font-bold text-base sm:text-lg mb-2.5 leading-tight">
              Follow us
            </h3>
            <div className="flex gap-3 text-[19px] sm:text-[20px] text-gray-300 items-center mt-1">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#FFA833] transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#FFA833] transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#FFA833] transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="hover:text-[#FFA833] transition"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        {/* Giant KICKS watermark: always at bottom center, behind content */}
        <div className="">
          <div className="absolute left-0 right-0 w-full flex justify-center whitespace-nowrap">
            <img
              src="/logo_white.svg"
              alt="KicksPlus Logo"
              className="w-11/12 mx-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
