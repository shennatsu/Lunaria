"use client";
import { useState } from "react";
import Image from "next/image";

const flowers = [
  {
    id: 1,
    name: "Lily",
    meaning: "purity; love; beauty; rebirth",
    price: 20000,
    season: "Spring",
    image: "/lily.jpg",
  },
  {
    id: 2,
    name: "Sunflower",
    meaning: "happiness; positivity; warmth; loyalty",
    price: 20000,
    season: "Summer",
    image: "/sunflower.jpg",
  },
  {
    id: 3,
    name: "Chrysanthemum",
    meaning: "joy; optimism; longevity; fidelity",
    price: 20000,
    season: "Autumn",
    image: "/chrysanthemum.jpg",
  },
  {
    id: 4,
    name: "Snowdrop",
    meaning: "new beginnings; hope; rebirth; triumph over challenges",
    price: 20000,
    season: "Winter",
    image: "/snowdrop.jpg",
  },
];


export default function ShopPage() {
  const [selectedSeason, setSelectedSeason] = useState("Spring");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFlowers = flowers.filter(
    (flower) =>
      flower.season === selectedSeason &&
      flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const seasonColors = {
    Spring: {
      bg: "bg-pink-300",
      card: "from-pink-50 to-white",
      button: "bg-pink-400",
    },
    Summer: {
      bg: "bg-yellow-400",
      card: "from-yellow-50 to-white",
      button: "bg-yellow-400",
    },
    Autumn: {
      bg: "bg-orange-400",
      card: "from-orange-50 to-white",
      button: "bg-orange-400",
    },
    Winter: {
      bg: "bg-blue-400",
      card: "from-blue-50 to-white",
      button: "bg-blue-400",
    },
  };

  return (
    <main className="p-8">
      <section className="">
        <h1>Lunaria</h1>
          <Image
              src="/flower-header.svg"
              alt="flower header"
              width={1200}
              height={400}
          />
          <button>COLLECTIONS</button>
      </section>

      <section>
        <div className="flex justify-center gap-4 mb-8">
          {["Spring", "Summer", "Autumn", "Winter"].map((season) => {
            const isActive = selectedSeason === season;
            return (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  isActive
                    ? `${seasonColors[season].bg} text-white`
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {season}
              </button>
            );
          })}
        </div>

        {/* 🔍 Filter dan Search */}
        <div className="flex justify-center gap-4 mb-10">
          <select className="border rounded-md px-3 py-2 shadow-sm">
            <option>Filter</option>
            <option>Harga kurang dari 20000</option>
            <option>Harga kurang dari 20000</option>
          </select>

          <input
            type="text"
            placeholder="Find your flower..."
            className="w-64 border rounded-md px-4 py-2 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 💐 Kartu Bunga */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
          {filteredFlowers.map((flower) => (
            <div
              key={flower.id}
              className={`p-4 rounded-xl shadow-lg text-center transition-all w-56 ${
                {
                  Spring: "bg-gradient-to-b from-pink-50 to-white",
                  Summer: "bg-gradient-to-b from-yellow-50 to-white",
                  Autumn: "bg-gradient-to-b from-orange-50 to-white",
                  Winter: "bg-gradient-to-b from-blue-50 to-white",
                }[selectedSeason]
              }`}
            >
              <Image
                src={flower.image}
                alt={flower.name}
                width={150}
                height={150}
                className="mx-auto rounded-lg mb-3"
              />
              <h2 className="font-serif text-xl">{flower.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{flower.meaning}</p>
              <button
                className={`px-4 py-2 text-white rounded-lg ${seasonColors[selectedSeason].button}`}
              >
                Rp {flower.price.toLocaleString()}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
