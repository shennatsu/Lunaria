// src/app/components/Header.js
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsCart, BsPerson } from 'react-icons/bs';
import { HiOutlineMenu } from 'react-icons/hi';
import { ProfileDropdown } from './ProfileDropdown';

export function Header({ setMenuOpen, activeSection, isLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // (opsional) jika nanti mau pakai deteksi klik luar lagi
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

  // Fungsi handle navigasi Home
  const handleHomeClick = () => {
    if (isLoggedIn) {
      router.push('/'); // kalau sudah login ke dashboard
    } else {
      router.push('/'); // kalau belum login ke landing page
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 z-50 w-full max-w-6xl px-4 pt-6 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none">
      <nav className="flex items-center w-full">

        {/* --- TAMPILAN DESKTOP --- */}
        <div className="hidden lg:flex items-center justify-center gap-12 px-20 py-5 rounded-full shadow-lg bg-white/30 backdrop-blur-md">
          <button
            onClick={handleHomeClick}
            className={`font-dm font-semibold text-lg ${
              activeSection === 'home' ? 'text-black' : 'text-black/40'
            }`}
          >
            Home
          </button>

          <a href="#" className="font-dm font-semibold text-lg text-black/40">
            Shop
          </a>
          <a
            href="#postcard"
            className={`font-dm font-semibold text-lg ${
              activeSection === 'postcard' ? 'text-black' : 'text-black/40'
            }`}
          >
            Postcard
          </a>
          <a
            href="#contact"
            className={`font-dm font-semibold text-lg ${
              activeSection === 'contact' ? 'text-black' : 'text-black/40'
            }`}
          >
            Contact
          </a>
        </div>

        {/* Kanan Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-12 px-10 py-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md ml-auto">
          <BsCart className="text-zinc-800 w-[26px] h-[26px]" />
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

        {/* --- TAMPILAN MOBILE --- */}
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
            <BsCart className="text-zinc-800 w-[22px] h-[22px]" />
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
