"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsCart, BsPerson } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { ProfileDropdown } from "./ProfileDropdown";

export function Header({ setMenuOpen, activeSection, isLoggedIn, onCartClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Opsional: Deteksi klik di luar dropdown
  /*
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  */

  // Navigasi Home
  const handleHomeClick = () => {
    if (isLoggedIn) {
      router.push("/"); // bisa diarahkan ke dashboard user kalau mau
    } else {
      router.push("/"); // landing page
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 z-50 w-full max-w-6xl px-4 pt-6 lg:pt-0 bg-page-bg/90 backdrop-blur-md shadow-sm lg:bg-transparent lg:backdrop-blur-none lg:shadow-none">
      <nav className="flex items-center w-full">

        {/* --- TAMPILAN DESKTOP (lg ke atas) --- */}
        <div className="hidden lg:flex items-center justify-center gap-12 px-20 py-5 rounded-full shadow-lg bg-white/30 backdrop-blur-md">
          <button
            onClick={handleHomeClick}
            className={`font-dm font-semibold text-lg ${
              activeSection === "home" ? "text-black" : "text-black/40"
            }`}
          >
            Home
          </button>

          <a
            href="shop"
            className={`font-dm font-semibold text-lg ${
              activeSection === "shop" ? "text-black" : "text-black/40"
            }`}
          >
            Shop
          </a>

          <a
            href="#postcard-section"
            className={`font-dm font-semibold text-lg ${
              activeSection === "postcard" ? "text-black" : "text-black/40"
            }`}
          >
            Postcard
          </a>

          <a
            href="#contact"
            className={`font-dm font-semibold text-lg ${
              activeSection === "contact" ? "text-black" : "text-black/40"
            }`}
          >
            Contact
          </a>
        </div>

        {/* --- BAGIAN KANAN DESKTOP (cart + profile) --- */}
        <div className="hidden lg:flex items-center justify-center gap-12 px-10 py-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md ml-auto">
          <button onClick={onCartClick}>
            <BsCart className="text-zinc-800 w-[26px] h-[26px]" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <BsPerson className="text-zinc-800 w-[26px] h-[26px]" />
            </button>
            {isDropdownOpen && (
              <ProfileDropdown
                isLoggedIn={isLoggedIn}
                onClose={() => setIsDropdownOpen(false)}
              />
            )}
          </div>
        </div>

        {/* --- TAMPILAN MOBILE (di bawah lg) --- */}
        <div className="flex lg:hidden items-center justify-between w-full max-w-sm mx-auto px-6 py-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md">
          <button onClick={() => setMenuOpen(true)} className="p-1">
            <HiOutlineMenu className="text-zinc-800 w-6 h-6" />
          </button>

          <button
            onClick={handleHomeClick}
            className="font-dm font-semibold text-base text-black"
          >
            Home
          </button>

          <div className="flex items-center gap-6">
            {/* ✅ Tombol Cart Mobile */}
            <button onClick={onCartClick}>
              <BsCart className="text-zinc-800 w-[26px] h-[26px]" />
            </button>

            {/* ✅ Tombol Profile Mobile */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <BsPerson className="text-zinc-800 w-[22px] h-[22px]" />
              </button>
              {isDropdownOpen && (
                <ProfileDropdown
                  isLoggedIn={isLoggedIn}
                  onClose={() => setIsDropdownOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}
