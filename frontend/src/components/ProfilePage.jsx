'use client'

import { useEffect, useState } from 'react';
import { User, Phone, MapPin, Save, LogOut, Calendar, ChevronDown, ChevronUp, Package } from 'lucide-react';


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('userInfo');
  const [formData, setFormData] = useState({
    username: 'prot',
    phone: '08xxxxxxxxxx',
    address: ''
  });

  // Dummy data orders - nanti ganti dari API backend
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-10-15',
      status: 'Delivered',
      total: 450000,
      items: [
        { name: 'Rose Bouquet Premium', qty: 2, price: 225000 }
      ],
      shippingAddress: 'Jl. Margonda Raya No. 123, Depok'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-10-18',
      status: 'Shipped',
      total: 320000,
      items: [
        { name: 'Lily Arrangement', qty: 1, price: 320000 }
      ],
      shippingAddress: 'Jl. Margonda Raya No. 123, Depok'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-10-20',
      status: 'Processing',
      total: 180000,
      items: [
        { name: 'Sunflower Bundle', qty: 1, price: 180000 }
      ],
      shippingAddress: 'Jl. Margonda Raya No. 123, Depok'
    }
  ];

  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  // 🔹 Ambil data dari backend saat halaman dibuka
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile/1761040079213");
        if (!res.ok) throw new Error('Gagal mengambil data profil');
        const data = await res.json();
        setFormData({
          username: data.username || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      } catch (err) {
        console.error("❌ Error saat fetch profil:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
     e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/profile/1761040079213", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Gagal update: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Response dari backend:", data);
    alert("Profil berhasil diperbarui!");
  } catch (err) {
    console.error("❌ Error saat update profil:", err);
    alert("Gagal memperbarui profil!");
  }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFDAF5] via-[#E9B6C2] to-[#E1688B] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🌸
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
              <p className="text-gray-600">Kelola informasi dan riwayat pesanan Anda</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-pink-300 transition-all duration-300 flex items-center gap-2 shadow-md">
             <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b-2 border-gray-100">
            <button
              onClick={() => setActiveTab('userInfo')}
              className={`flex-1 py-5 text-lg font-semibold transition-all duration-300 ${
                activeTab === 'userInfo'
                  ? 'text-pink-600 border-b-4 border-pink-500 bg-pink-50'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              User Info
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-5 text-lg font-semibold transition-all duration-300 ${
                activeTab === 'orders'
                  ? 'text-pink-600 border-b-4 border-pink-500 bg-pink-50'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              Riwayat Pesanan
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'userInfo' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                      <User className="w-5 h-5 text-pink-500" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                      placeholder="Masukkan username"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                      <Phone className="w-5 h-5 text-pink-500" />
                      No. Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                      <MapPin className="w-5 h-5 text-pink-500" />
                      Alamat
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-100 resize-none"
                      placeholder="Masukkan alamat lengkap Anda"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>💾</span>
                    Simpan Perubahan
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* Order Header */}
                      <div
                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold text-gray-800">{order.id}</h3>
                            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <button className="text-2xl text-gray-400 hover:text-pink-500 transition-colors">
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-6 h-6 text-[#4A1900]" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-[#4A1900]" />
                          )}                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                          <span>📅</span>
                          <span>{order.date}</span>
                        </div>
                        
                        <div className="text-2xl font-bold text-gray-800">
                          Rp {order.total.toLocaleString('id-ID')}
                        </div>
                      </div>

                      {/* Order Details (Expandable) */}
                      {expandedOrder === order.id && (
                        <div className="border-t-2 border-gray-100 p-6 bg-gray-50 animate-fadeIn">
                          <h4 className="font-bold text-gray-800 mb-4 text-lg">Order Items</h4>
                          
                          <div className="space-y-3 mb-6">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                                <div>
                                  <p className="font-semibold text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                </div>
                                <p className="font-bold text-gray-800">
                                  Rp {item.price.toLocaleString('id-ID')}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="bg-white p-4 rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                              <span className="text-pink-500 text-xl">📍</span>
                              <div>
                                <p className="font-semibold text-gray-700 mb-1">Shipping Address</p>
                                <p className="text-gray-600">{order.shippingAddress}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {orders.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-xl text-gray-500">Belum ada pesanan</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}