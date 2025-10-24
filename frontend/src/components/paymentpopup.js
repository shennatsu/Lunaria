"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
});

export default function PaymentPopup({ total, onClose, onConfirm }) {
  const [method, setMethod] = useState("credit");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    if (method === "paypal") {
      // Simulasi redirect ke PayPal
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Payment successful via PayPal!");
        onConfirm();
      }, 2000);
    } else {
      onConfirm();
    }
  };

  return (
    <div
      className={`${dmSans.className} fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}
    >
      <div className="bg-white w-[90%] sm:w-[420px] rounded-2xl shadow-lg overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>
        </div>

        {/* Payment method switcher */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg border font-medium ${
              method === "credit"
                ? "bg-[#987772] text-white border-[#987772]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setMethod("credit")}
          >
            Credit Card
          </button>
          <button
            className={`px-4 py-2 rounded-lg border font-medium ${
              method === "paypal"
                ? "bg-[#987772] text-white border-[#987772]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setMethod("paypal")}
          >
            PayPal
          </button>
        </div>

        {/* Form Section */}
        <div className="p-5">
          {method === "credit" ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#987772]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#987772]"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#987772]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={3}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#987772]"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center py-6">
              <Image
                src="/paypal.png"
                alt="PayPal"
                width={120}
                height={80}
                className="mb-4"
              />
              <p className="text-gray-600 text-center text-sm mb-4">
                You will be redirected to PayPal to complete your purchase securely.
              </p>

              {loading && (
                <div className="flex items-center gap-2 text-[#987772]">
                  <Loader2 className="animate-spin" size={18} />
                  <span>Redirecting to PayPal...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Total:</p>
            <p className="font-semibold text-lg">Rp {total.toLocaleString("id-ID")}</p>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-[#987772] to-[#451900] text-white py-2 rounded-lg shadow transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading
              ? "Processing..."
              : method === "credit"
              ? "Pay with Credit Card"
              : "Pay with PayPal"}
          </button>

          {method === "paypal" && !loading && (
            <p className="text-center text-gray-500 text-xs mt-2">
              You’ll be redirected to PayPal for secure checkout.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
