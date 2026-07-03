import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiCheck, 
  FiMapPin, 
  FiClock, 
  FiCreditCard, 
  FiFileText,
  FiCircle,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiPackage,
  FiAward
} from 'react-icons/fi';
import { FaCcStripe, FaPaypal, FaGooglePay } from 'react-icons/fa';

const orderItems = [
  { id: 1, brand: 'AASHIRVAAD', name: 'Whole Wheat Atta', weight: '10 kg', qty: 1, price: 12.99, image: '/images/prod-wheat-atta.png' },
  { id: 2, brand: 'INDIA GATE', name: 'Basmati Rice', weight: '5 kg', qty: 1, price: 16.99, image: '/images/prod-basmati-rice.png' },
  { id: 3, brand: 'TATA SAMPANN', name: 'Toor Dal', weight: '1 kg', qty: 2, price: 9.98, image: '/images/prod-toor-dal.png' }
];

const Checkout = () => {
  return (
    <div className="bg-white pb-20 font-sans">
      
      {/* Breadcrumb Area */}
      <div className="border-b border-gray-100 py-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-[#2e7d32]">Home</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <Link to="/cart" className="hover:text-[#2e7d32]">Cart</Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-900 font-bold">Checkout</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-gray-100 py-6">
        <div className="container px-4 mx-auto flex items-center justify-center max-w-3xl">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-bold">
              <FiCheck size={18} />
            </div>
            <span className="text-[#2e7d32] font-bold text-sm">Cart</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-[#2e7d32] mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2e7d32] text-white flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-[#2e7d32] font-bold text-sm">Address</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-gray-400 font-bold text-sm">Delivery</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              4
            </div>
            <span className="text-gray-400 font-bold text-sm">Payment</span>
          </div>
          
          <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold">
              5
            </div>
            <span className="text-gray-400 font-bold text-sm">Review</span>
          </div>
          
        </div>
      </div>

      <div className="container px-4 mx-auto pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Checkout Steps */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            
            {/* Step 2: Shipping Address */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiMapPin size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Shipping Address</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 2</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="Priya" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="Sharma" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="+44 7890 123456" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" defaultValue="priya.sharma@email.com" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">House / Flat Number <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="Flat 4B" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Street Address <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="142 Brick Lane" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="London" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">County</label>
                    <input type="text" defaultValue="Greater London" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700">Postcode <span className="text-red-500">*</span></label>
                    <input type="text" defaultValue="E1 6RF" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32]" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="text-sm font-bold text-gray-700">Delivery Notes</label>
                  <textarea 
                    rows="2" 
                    defaultValue="Leave at door if no answer. Please ring bell first." 
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none focus:border-[#2e7d32] resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Address Type</label>
                  <div className="flex items-center gap-4">
                    <button className="flex-1 border border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32] font-bold text-sm py-2.5 rounded-lg transition-colors">
                      Home
                    </button>
                    <button className="flex-1 border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-bold text-sm py-2.5 rounded-lg transition-colors">
                      Work
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Delivery Slot */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiClock size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Choose Delivery Slot</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 3</span>
              </div>
              
              <div className="p-6">
                <p className="text-sm font-bold text-gray-900 mb-4">Select your preferred delivery time for tomorrow:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[#2e7d32] bg-[#e8f5e9] rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer">
                    <span className="text-[#2e7d32] font-bold text-sm">Morning</span>
                    <span className="text-gray-500 text-xs font-medium">9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="border border-gray-200 bg-white hover:border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors">
                    <span className="text-gray-900 font-bold text-sm">Afternoon</span>
                    <span className="text-gray-500 text-xs font-medium">12:00 PM - 5:00 PM</span>
                  </div>
                  <div className="border border-gray-200 bg-white hover:border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors">
                    <span className="text-gray-900 font-bold text-sm">Evening</span>
                    <span className="text-gray-500 text-xs font-medium">5:00 PM - 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiCreditCard size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Payment Method</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 4</span>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Credit Card Selected */}
                  <div className="border border-[#2e7d32] bg-[#e8f5e9] rounded-xl p-4 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-gray-600 shadow-sm">
                        <FiCreditCard size={18} />
                      </div>
                      <span className="text-[#2e7d32] font-bold text-sm">Credit Card</span>
                    </div>
                    <FiCheckCircle className="text-[#2e7d32]" size={18} />
                  </div>

                  {/* Debit Card Unselected */}
                  <div className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-gray-600 shadow-sm">
                        <FiCreditCard size={18} />
                      </div>
                      <span className="text-gray-700 font-bold text-sm">Debit Card</span>
                    </div>
                    <FiCircle className="text-gray-300" size={18} />
                  </div>

                  {/* Stripe Unselected */}
                  <div className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#635BFF] rounded flex items-center justify-center text-white shadow-sm">
                        <FaCcStripe size={20} />
                      </div>
                      <span className="text-gray-700 font-bold text-sm">Stripe</span>
                    </div>
                    <FiCircle className="text-gray-300" size={18} />
                  </div>

                  {/* PayPal Unselected */}
                  <div className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00457C] rounded flex items-center justify-center text-white shadow-sm">
                        <FaPaypal size={18} />
                      </div>
                      <span className="text-gray-700 font-bold text-sm">PayPal</span>
                    </div>
                    <FiCircle className="text-gray-300" size={18} />
                  </div>

                  {/* Google Pay Unselected */}
                  <div className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-900 shadow-sm">
                        <FaGooglePay size={24} />
                      </div>
                      <span className="text-gray-700 font-bold text-sm">Google Pay</span>
                    </div>
                    <FiCircle className="text-gray-300" size={18} />
                  </div>
                </div>

                {/* Credit Card Form */}
                <div className="bg-[#f9fafb] p-5 rounded-xl border border-gray-200 mb-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-700">Card Number</label>
                      <input type="text" defaultValue="**** **** **** 4242" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none bg-white focus:border-[#2e7d32]" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700">Expiry Date</label>
                        <input type="text" defaultValue="08 / 27" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none bg-white focus:border-[#2e7d32]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-700">CVV</label>
                        <input type="password" defaultValue="123" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none bg-white focus:border-[#2e7d32] font-mono tracking-widest" placeholder="***" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-700">Name on Card</label>
                      <input type="text" defaultValue="Priya Sharma" className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium outline-none bg-white focus:border-[#2e7d32]" />
                    </div>
                  </div>
                </div>

                {/* Billing Address Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer w-fit">
                  <div className="w-5 h-5 rounded bg-[#2e7d32] flex items-center justify-center text-white">
                    <FiCheck size={14} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Billing address is the same as shipping address</span>
                </label>
              </div>
            </div>

            {/* Step 5: Review Your Order */}
            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f5e9] text-[#2e7d32] flex items-center justify-center">
                    <FiFileText size={16} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">Review Your Order</h2>
                </div>
                <span className="text-[#2e7d32] text-xs font-bold bg-[#e8f5e9] px-3 py-1 rounded-full">Step 5</span>
              </div>
              
              <div className="p-6 flex flex-col gap-5">
                {orderItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 p-1">
                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-[#2e7d32] text-[9px] font-black uppercase tracking-wider">{item.brand}</span>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1">{item.name}</h4>
                        <span className="text-xs font-medium text-gray-500">{item.weight}</span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs font-bold text-gray-500 mb-1">Qty: {item.qty}</span>
                        <span className="text-sm font-black text-[#2e7d32]">£{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    {index < orderItems.length - 1 && <div className="h-[1px] bg-gray-100 w-full mt-5"></div>}
                  </div>
                ))}
                
                <div className="h-[1px] bg-gray-200 w-full mt-2"></div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-gray-900">Order Total:</span>
                  <span className="text-2xl font-black text-[#2e7d32]">£41.46</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              
              <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm mb-6">
                <div className="bg-[#2e7d32] text-white p-5">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                </div>
                
                <div className="p-6">
                  {/* Small items list */}
                  <div className="flex flex-col gap-4 mb-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border border-gray-100 rounded flex items-center justify-center p-1">
                          <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 flex flex-col overflow-hidden">
                          <span className="text-xs font-bold text-gray-900 truncate">{item.brand} {item.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-gray-500 font-medium">x{item.qty}</span>
                          <span className="font-bold text-gray-900 min-w-[45px] text-right">£{item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <div className="flex gap-2 mb-6">
                    <input 
                      type="text" 
                      placeholder="Enter promo code..." 
                      className="flex-1 bg-[#f9fafb] border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:border-[#2e7d32]"
                    />
                    <button className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors">
                      Apply
                    </button>
                  </div>

                  {/* Totals */}
                  <div className="flex flex-col gap-3.5 mb-6 text-sm font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal (3 items)</span>
                      <span className="text-gray-900 font-bold">£39.96</span>
                    </div>
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Discount (10%)</span>
                      <span className="font-bold">- £4.00</span>
                    </div>
                    <div className="flex justify-between text-[#2e7d32]">
                      <span>Delivery Charge</span>
                      <span className="font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (VAT 5%)</span>
                      <span className="text-gray-900 font-bold">£1.50</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-900 font-bold text-lg">Grand Total</span>
                      <span className="text-[#2e7d32] font-black text-2xl">£37.46</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-black py-4 rounded-lg transition-colors shadow-md text-base mb-3">
                    Place Order Securely
                  </button>
                  
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">256-bit SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>

              {/* Trust Features Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiShield className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Secure Payment</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiTruck className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Fast Delivery</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiPackage className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Fresh Products</span>
                </div>
                <div className="bg-[#f9fafb] border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                  <FiAward className="text-[#2e7d32] text-xl" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Money Back Guarantee</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
