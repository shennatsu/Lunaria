"use client";
import { useState } from "react";
import Image from "next/image";
import FlowerPopup from "../../components/flowerpopup";
import { Libre_Caslon_Display } from "next/font/google";

const libreCaslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
});

const flowers = [
  {
    id: 1,
    name: "Lily",
    meaning: "purity; love; beauty; rebirth",
    price: 20000,
    season: "Spring",
    umur_tahan: 5,
    image: "/lily.svg",
    otherImages: ["/lily2.svg", "/lily3.svg"],
    status_tersedia: true,
  },
  {
    id: 2,
    name: "Sunflower",
    meaning: "happiness; positivity; warmth; loyalty",
    price: 20000,
    season: "Summer",
    umur_tahan: 10,
    image: "/sunflower.svg",
    otherImages: ["/sunflower2.svg", "/sunflower3.svg"],
    status_tersedia: false,
  },
  {
    id: 3,
    name: "Chrysanthemum",
    meaning: "joy; optimism; longevity; fidelity",
    price: 20000,
    season: "Autumn",
    umur_tahan: 14,
    image: "/chrysanthemum.svg",
    otherImages: ["/chrysanthemum2.svg", "/chrysanthemum3.svg"],
    status_tersedia: true,
  },
  {
    id: 4,
    name: "Snowdrop",
    meaning: "new beginnings; hope; rebirth; triumph over challenges",
    price: 20000,
    season: "Winter",
    umur_tahan: 7,
    image: "/snowdrop.svg",
    otherImages: ["/snowdrop2.svg", "/snowdrop3.svg"],
    status_tersedia: true,
  },
  {
    id: 5,
    name: "Daisy",
    meaning: "pure; happiness",
    price: 10000,
    season: "Spring",
    umur_tahan: 4,
    image: "/daisy.svg",
    otherImages: ["/daisy2.svg", "/daisy3.svg"],
    status_tersedia: false,
  },
];


export default function ShopPage() {
  const [selectedSeason, setSelectedSeason] = useState("Spring");
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [selectedFlower, setSelectedFlower] = useState(null);

  const seasonColors = {
    Spring: {
      card: "from-[#FFEFF4] to-[#F1CED6]",
      button: "bg-[#CA217C]",
    },
    Summer: {
      card: "from-[#FFFEEF] to-[#F2ECD0]",
      button: "bg-[#EAC81D]",
    },
    Autumn: {
      card: "from-[#FFF0F0] to-[#F2D7D0]",
      button: "bg-[#BC6C5C]",
    },
    Winter: {
      card: "from-[#F7FBFF] to-[#DAD7E8]",
      button: "bg-[#5584DB]",
    },
  };

  let filteredFlowers = flowers.filter((flower) => {
    const matchesSeason = flower.season === selectedSeason;
    const matchesSearch = flower.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAvailability =
      availabilityFilter === "available"
        ? flower.status_tersedia
        : availabilityFilter === "unavailable"
        ? !flower.status_tersedia
        : true;

    return matchesSeason && matchesSearch && matchesAvailability;
  });

  if (sortOption === "harga-asc") {
    filteredFlowers.sort((a, b) => a.price - b.price);
  } else if (sortOption === "harga-desc") {
    filteredFlowers.sort((a, b) => b.price - a.price);
  } else if (sortOption === "umur-asc") {
    filteredFlowers.sort((a, b) => a.umur_tahan - b.umur_tahan);
  } else if (sortOption === "umur-desc") {
    filteredFlowers.sort((a, b) => b.umur_tahan - a.umur_tahan);
  }

  return (
    <main className="h-full bg-[#FFF7FC] pb-20">
      <section className="relative text-center w-full overflow-hidden bg-[#F1D7D0]">
        <div className="relative w-full h-[500px]">
          <Image
            src="/flower-header.png"
            alt="flower header"
            width={1440}
            height={573}
            className="w-full object-cover h-[500px]"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/70"></div>
          
          <h1
            className={`${libreCaslon.className} absolute inset-0 flex items-center justify-center text-9xl text-[#451900] drop-shadow-lg -translate-y-28 tracking-widest`}
          >
            Lunaria
          </h1>
        </div>
      </section>

      <section>
        <div className="flex justify-center gap-16 mt-12 mb-8">
          {["Spring", "Summer", "Autumn", "Winter"].map((season) => {
            const isActive = selectedSeason === season;
            return (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-6 py-2 rounded-full font-semibold pl-16 pr-16 transition-all ${
                  isActive
                    ? `${seasonColors[season].button} text-white`
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {season}
              </button>
            );
          })}
        </div>

        {/* Filter dan Search */}
        <div className="flex justify-center gap-4 mb-10">
          <select
            className="w-40 border rounded-md px-2 py-2 shadow-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="harga-asc">Harga Termurah</option>
            <option value="harga-desc">Harga Termahal</option>
            <option value="umur-asc">Umur Tahan Terpendek</option>
            <option value="umur-desc">Umur Tahan Terlama</option>
          </select>

          <select
            className="w-40 border rounded-md px-2 py-2 shadow-sm"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="available">Tersedia</option>
            <option value="unavailable">Tidak Tersedia</option>
          </select>

          <input
            type="text"
            placeholder="Find your flower..."
            className="w-96 border rounded-md px-4 py-2 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Kartu Bunga */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center mb-10 ml-20 mr-20">
          {filteredFlowers.map((flower) => {
            const isAvailable = flower.status_tersedia;

            return (
              <div
                key={flower.id}
                className={`relative w-56 h-56 [perspective:1000px] ${
                  !isAvailable ? "opacity-60 grayscale" : ""
                }`}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] rounded-xl shadow-lg bg-gradient-to-b ${seasonColors[selectedSeason].card}`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
                    <Image
                      src={flower.image}
                      alt={flower.name}
                      width={300}
                      height={300}
                    />
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <h2 className="font-serif text-xl mb-2">{flower.name}</h2>
                    <p className="text-sm text-gray-600 mb-3">{flower.meaning}</p>
                    <button
                      disabled={!isAvailable}
                      onClick={() => setSelectedFlower(flower)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        isAvailable
                          ? `${seasonColors[selectedSeason].button}`
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? "See Details" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedFlower && (
          <FlowerPopup
            flower={selectedFlower}
            onClose={() => setSelectedFlower(null)}
          />
        )}

      </section>
    </main>
  );
}
