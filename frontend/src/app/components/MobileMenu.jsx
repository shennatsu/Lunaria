// src/app/components/MobileMenu.js
import { HiX } from 'react-icons/hi'

// ----- KOMPONEN MOBILE MENU -----
// Tanda 'type' sudah dihapus
export function MobileMenu({ isOpen, setMenuOpen, activeSection }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={() => setMenuOpen(false)} 
    >
      {/* Panel Menu (yang slide dari kiri) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-page-bg shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header Menu (Tombol Close) */}
        <div className="flex justify-end p-6">
          <button onClick={() => setMenuOpen(false)}>
            <HiX className="w-7 h-7 text-zinc-800" />
          </button>
        </div>

        {/* Link Navigasi */}
        <nav className="flex flex-col p-6 space-y-6">
          <a
            href="#"
            className="font-dm font-semibold text-2xl text-black/60"
          >
            Shop
          </a>
          <a
            href="#postcard-section"
            className={`font-dm font-semibold text-2xl ${
              activeSection === 'postcard' ? 'text-black' : 'text-black/60'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Postcard
          </a>
         <a
            href="#contact-section"
            className={`font-dm font-semibold text-2xl ${
              activeSection === 'contact' ? 'text-black' : 'text-black/60'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </nav>
      </div>
    </div>
  )
}