"use client";
import { useState } from "react";
import Image from "next/image";

export default function FlowerPopup({
  flower,
  flowers,
  onSelectFlower,
  onClose,
  onAddToCart,
}) {
  const [showImage, setShowImage] = useState(null);
  const [amount, setAmount] = useState(1); // ✅ jumlah bunga yang akan ditambahkan

  if (!flower) return null; // Tidak tampil kalau belum ada bunga terpilih

  // Fungsi ubah jumlah
  const handleChangeAmount = (type) => {
    setAmount((prev) => {
      if (type === "decrease") return Math.max(prev - 1, 1);
      if (type === "increase") return prev + 1;
      return prev;
    });
  };

  // Fungsi add to cart dengan jumlah
  const handleAddClick = () => {
    onAddToCart({ ...flower, qty: amount }); // ✅ kirim jumlah
    onClose(); // opsional: tutup popup setelah add
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#fff8f7] rounded-2xl p-6 w-[90%] max-w-4xl shadow-2xl relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-8 h-8 text-lg flex items-center justify-center hover:bg-red-700"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-8 ml-5">
          {/* Gambar utama */}
          <div className="flex flex-col gap-4 items-center mr-7">
            <Image
              src={flower.image}
              alt={flower.name}
              width={370}
              height={340}
              style={{
                width: "370px",
                height: "340px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              className="rounded-xl shadow hover:scale-105 transition-transform"
              onClick={() => setShowImage(flower.image)}
            />

            {/* Gambar lain */}
            {flower.otherImages && flower.otherImages.length > 0 && (
              <div className="flex gap-4">
                {flower.otherImages.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`${flower.name} var ${i + 1}`}
                    width={120}
                    height={120}
                    className="rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setShowImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail produk */}
          <div className="flex-1 text-[#451900]">
            <h2 className="text-3xl font-serif mb-2">{flower.name}</h2>
            <p className="text-lg font-semibold">
              Rp {flower.price.toLocaleString("id-ID")}
            </p>
            <p className="mt-2">Lifespan: {flower.umur_tahan} Days</p>
            <p className="mt-3 text-sm text-gray-700">{flower.meaning}</p>

            {/* Amount */}
            <div className="mt-5 flex items-center gap-4">
              <p className="font-semibold">Amount</p>
              <button
                className="bg-[#451900] text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#987772] hover:text-[#451900]"
                onClick={() => handleChangeAmount("decrease")}
              >
                -
              </button>
              <span className="text-lg w-6 text-center">{amount}</span>
              <button
                className="bg-[#451900] text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#987772] hover:text-[#451900]"
                onClick={() => handleChangeAmount("increase")}
              >
                +
              </button>
            </div>

            {/* Kombinasi bunga */}
            <div className="mt-6">
              <p className="font-medium mb-2">
                Flower combinations that go well with this flower
              </p>

              <div className="flex gap-4 flex-wrap">
                {flower.rekomendasi_perpaduan &&
                flower.rekomendasi_perpaduan.length > 0 ? (
                  flower.rekomendasi_perpaduan.map((comboName, i) => {
                    const comboFlower = flowers.find(
                      (f) =>
                        f.name.toLowerCase() === comboName.toLowerCase()
                    );

                    return (
                      <div
                        key={i}
                        className="bg-[#f4eceb] p-2 rounded-xl text-center shadow-sm cursor-pointer hover:scale-105 transition-transform"
                        onClick={() =>
                          comboFlower && onSelectFlower(comboFlower)
                        }
                      >
                        {comboFlower ? (
                          <>
                            <Image
                              src={comboFlower.image}
                              alt={comboFlower.name}
                              width={80}
                              height={80}
                              className="mx-auto rounded-md"
                            />
                            <p className="text-sm mt-1">
                              {comboFlower.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-600">
                              {comboName}
                            </div>
                            <p className="text-sm mt-1 text-gray-600">
                              (not in list)
                            </p>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-sm">
                    No combination recommendations available
                  </p>
                )}
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddClick}
                className="bg-white border border-[#451900] text-[#451900] rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-[#987772] hover:text-[#451900] transition"
              >
                Add to Cart
              </button>
              <button className="bg-[#451900] text-white px-6 py-2 rounded-xl shadow hover:bg-[#987772] hover:text-[#451900] transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview gambar penuh */}
      {showImage && (
        <div
          onClick={() => setShowImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] cursor-zoom-out"
        >
          <Image
            src={showImage}
            alt="preview"
            width={800}
            height={800}
            className="rounded-xl max-w-[90%] max-h-[90%] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
