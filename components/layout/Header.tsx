"use client";

import { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";
import Link from "next/link";

// Navigation header with mobile menu and cart integration.
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="px-4 md:px-10 pt-4 sticky top-0 z-40">
        <div className="bg-white rounded-xl px-4 sm:px-6 md:px-10 py-3 md:py-4 flex items-center justify-between shadow-sm">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl text-[#232321] cursor-pointer"
          >
            <FiMenu />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 font-medium text-[#232321]">
            <Link href="/" className="hover:text-[#4A69E2] transition-colors">
              New Drops 🔥
            </Link>
            <a href="#" className="hover:text-[#4A69E2] transition-colors">
              Men ▾
            </a>
            <a href="#" className="hover:text-[#4A69E2] transition-colors">
              Women ▾
            </a>
          </nav>

          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-widest text-[#232321]">
              KICKS
            </h1>
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <FiSearch className="hidden md:block text-xl cursor-pointer text-[#232321] hover:text-[#4A69E2] transition-colors" />
            <FiUser className="text-xl cursor-pointer text-[#232321] hover:text-[#4A69E2] transition-colors" />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white p-6 shadow-xl transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-extrabold text-xl text-[#232321]">Menu</h2>
            <FiX
              onClick={() => setOpen(false)}
              className="text-2xl cursor-pointer text-[#232321]"
            />
          </div>
          <ul className="space-y-5 text-lg font-medium text-[#232321]">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="hover:text-[#4A69E2] transition-colors"
              >
                New Drops 🔥
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#4A69E2] transition-colors">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#4A69E2] transition-colors">
                Women
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
