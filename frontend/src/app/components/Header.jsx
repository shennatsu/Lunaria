// src/app/components/Header.js
import { BsCart, BsPerson } from 'react-icons/bs'
import { HiOutlineMenu } from 'react-icons/hi'

// ----- KOMPONEN HEADER / NAVBAR -----
export function Header({ setMenuOpen, activeSection }) {
  return (
    <header className="fixed top-0 left-0 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 z-30 w-full max-w-6xl px-4 pt-6 lg:pt-0 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none">
      <nav className="flex items-center w-full">
        {/* --- TAMPILAN DESKTOP (lg: ke atas) --- */}
        <div className="hidden lg:flex items-center justify-center gap-12 px-20 py-5 rounded-full shadow-lg bg-white/30 backdrop-blur-md">
          <a
            href="#home-section"
            className={`font-dm font-semibold text-lg ${
              activeSection === 'home' ? 'text-black' : 'text-black/40'
            }`}
          >
            Home
          </a>
          <a
            href="#"
            className="font-dm font-semibold text-lg text-black/40"
          >
            Shop
          </a>
          <a
            href="#postcard-section"
            className={`font-dm font-semibold text-lg ${
              activeSection === 'postcard' ? 'text-black' : 'text-black/40'
            }`}
          >
            Postcard
          </a>
          <a
            href="#contact-section"
            className={`font-dm font-semibold text-lg ${
            activeSection === 'contact' ? 'text-black' : 'text-black/40'
            }`}
          >
            Contact
          </a>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-12 px-10 py-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md ml-auto">
          <BsCart className="text-zinc-800 w-[26px] h-[26px]" />
          <BsPerson className="text-zinc-800 w-[26px] h-[26px]" />
        </div>

        {/* --- TAMPILAN MOBILE (di bawah lg) --- */}
        <div className="flex lg:hidden items-center justify-between w-full max-w-sm mx-auto px-6 py-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md">
          <button onClick={() => setMenuOpen(true)} className="p-1">
            <HiOutlineMenu className="text-zinc-800 w-6 h-6" />
          </button>
          <a
            href="#home-section"
            className="font-dm font-semibold text-base text-black"
          >
            Home
          </a>
          <div className="flex items-center gap-6">
            <BsCart className="text-zinc-800 w-[22px] h-[22px]" />
            <BsPerson className="text-zinc-800 w-[22px] h-[22px]" />
          </div>
        </div>
      </nav>
    </header>
  )
}