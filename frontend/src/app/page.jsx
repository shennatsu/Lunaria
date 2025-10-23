"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { MobileMenu } from './components/MobileMenu'
import { PostcardScroller } from './components/Scroller'
import { Footer } from './components/Footer'

// ----- HALAMAN UTAMA -----
export default function Home() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

// app/page.js

  // EFFECT BARU UNTUK MENDETEKSI SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home-section')
      const postcardSection = document.getElementById('postcard-section')
      const contactSection = document.getElementById('contact-section')
      
      // Offset standar
      const scrollPosition = window.scrollY + 120 
      
      // === INI PERBAIKANNYA ===
      // Cek apa kita sudah di paling bawah (toleransi 20px)
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

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) 
  
  return (
    <>
    <main
      className={`relative min-h-screen overflow-x-hidden
        ${isMenuOpen ? 'overflow-hidden' : ''}
      `}
    >
      {/* Panggil Komponen dari file terpisah */}
      <MobileMenu
        isOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
      />

      <Header
        setMenuOpen={setMenuOpen}
        activeSection={activeSection}
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
        id="home-section"
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
          <button className="px-10 py-3 text-base bg-button-bg rounded-2xl text-black">
            Our Contact
          </button>
        </div>
      </section>

      {/* Scroller Section */}
      <section
        id="postcard-section"
        className="relative flex flex-col gap-8 mt-40 lg:mt-48 py-10 scroll-m-12 lg:scroll-m-16"
      >
        <PostcardScroller direction="left" />
        <PostcardScroller direction="right" />
      </section>
    </main>
  <Footer />
  </>

  )
}