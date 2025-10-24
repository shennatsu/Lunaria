// src/app/page.js
"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
// IMPORT KOMPONEN
import { Header } from './components/Header'
import { MobileMenu } from './components/MobileMenu'
import { PostcardScroller } from './components/Scroller'
import { Footer } from './components/Footer' // Pastikan Footer diimport

// ----- HALAMAN UTAMA -----
export default function Home() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // --- PERBAIKAN LOGIKA CEK LOGIN ---
    console.log("Homepage useEffect running...");
    let loggedInStatus = false; // Defaultnya false
    try {
        const userString = localStorage.getItem('user');
        console.log("Raw user data from localStorage:", userString);
        // Cek apakah stringnya ada DAN bukan string 'undefined'/'null'
        if (userString && userString !== 'undefined' && userString !== 'null') {
            const userData = JSON.parse(userString);
            // Pastikan hasil parse adalah objek (bukan null/undefined/error)
            if (userData && typeof userData === 'object') {
                 loggedInStatus = true; // Baru set true jika valid
            }
        }
    } catch (error) {
        console.error("Error checking login status:", error);
        // Biarkan loggedInStatus false jika ada error
        localStorage.removeItem('user'); // Hapus item yg error
    }
    setIsLoggedIn(loggedInStatus);
    console.log("isLoggedIn state set to:", loggedInStatus);
    // --- AKHIR PERBAIKAN ---

    // Setup scrollspy (TETAP SAMA)
    const handleScroll = () => {
      const homeSection = document.getElementById('home')
      const postcardSection = document.getElementById('postcard')
      const contactSection = document.getElementById('contact')
      const scrollPosition = window.scrollY + 120
      const atBottom = window.scrollY + window.innerHeight >= document.body.offsetHeight - 20;

      if (atBottom && contactSection) {
        setActiveSection('contact');
      } else if (postcardSection && scrollPosition >= postcardSection.offsetTop) {
        setActiveSection('postcard');
      } else if (homeSection && scrollPosition >= homeSection.offsetTop) {
        setActiveSection('home');
      } else {
        setActiveSection('home');
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []); // Dependency array [] -> hanya jalan sekali saat mount

  return (
    <> {/* Fragment agar Footer bisa di luar main */}
      <main
        className={`relative min-h-screen overflow-x-hidden z-10
          ${isMenuOpen ? 'overflow-hidden' : ''}
        `}
      >
        <MobileMenu
          isOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          activeSection={activeSection}
        />

        <Header
          setMenuOpen={setMenuOpen}
          activeSection={activeSection}
          isLoggedIn={isLoggedIn} // Kirim status login
        />

        {/* Gambar Bunga Lily */}
        <div className="hidden lg:block absolute lg:top-[70px] lg:right-[-300px] lg:w-[855px] lg:h-[570px] -z-0">
          <Image
            src="/lily.png"
            alt="Blooming Lily"
            width={855}
            height={570}
            className="transform -rotate-45 opacity-95"
            priority
          />
        </div>

        {/* Hero Section */}
        <section
          id="home"
          className="relative z-0 pt-32 lg:pt-40 px-6 lg:px-0 lg:pl-28 max-w-full lg:max-w-4xl flex flex-col items-center lg:items-start"
        >
          <h1 className="font-caslon text-6xl md:text-7xl lg:text-9xl tracking-[0.15em] text-center lg:text-left">
            Lunaria
          </h1>
          <p className="font-dm font-medium text-base text-center lg:text-left max-w-2xl mt-6">
            At Lunaria, every flower is crafted with love and meaning. We believe
            each petal tells a story — from the passionate red rose to the calming
            scent of lavender. Discover our wide collection of fresh bouquets,
            custom floral arrangements, and elegant decorations for every special
            moment — birthdays, weddings, thank-you gifts, or simply to brighten
            your day.
          </p>
          <div className="flex flex-row flex-wrap gap-5 mt-12 font-dm font-medium justify-center lg:justify-start">
            <button className="px-10 py-3 text-base bg-button-bg rounded-2xl text-black">
              Our Product
            </button>
            <a 
            href="#contact" 
            className="px-10 py-3 text-base bg-button-bg rounded-2xl text-black text-center" // Tambah text-center biar mirip button
           >
              Our Contact
            </a>
          </div>
        </section>

        {/* Scroller Section */}
        <section
          id="postcard"
          className="relative flex flex-col gap-8 mt-32 lg:mt-48 py-10 scroll-m-24 lg:scroll-m-28"
        >
          <PostcardScroller direction="left" />
          <PostcardScroller direction="right" />
        </section>
          <Footer /> {/* Footer di luar main */}

      </main>

    </>
  )
}