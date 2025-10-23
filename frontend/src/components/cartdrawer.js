"use client";
import { useEffect } from "react";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";

export default function CartDrawer({ cartItems, onClose, onUpdateQty, onRemove }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 5000;
  const total = subtotal + shipping;

  // disable scroll saat cart terbuka
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full sm:w-[420px] h-full flex flex-col shadow-xl animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>
        </div>

        {/* Isi cart */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="flex gap-3 items-center border-b py-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.meaning.split(";")[0]}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="border w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                      onClick={() => onUpdateQty(item.id, Math.max(item.qty - 1, 1))}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="border w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">Rp {(item.price * item.qty).toLocaleString("id-ID")}</p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-red-600 mt-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p>Rp {subtotal.toLocaleString("id-ID")}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Shipping</p>
            <p>{shipping === 0 ? "Free" : `Rp ${shipping.toLocaleString("id-ID")}`}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>Rp {total.toLocaleString("id-ID")}</p>
          </div>

          <button className="w-full mt-2 bg-gradient-to-r from-[#987772] to-[#451900] text-white py-2 rounded-lg shadow hover:opacity-90">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
