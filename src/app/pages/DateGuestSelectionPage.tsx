import React, { useState } from "react";
import { Calendar, Users, X } from "lucide-react";

const DateGuestSelectionPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <div className="bg-[#232a22] min-h-screen flex flex-col items-center py-12">
      <div className="w-full max-w-xl bg-[#2e352a] rounded-2xl shadow-2xl p-0 relative">
        {/* Modal header with close icon */}
        <button className="absolute top-6 right-6 text-[#bfc7b6] hover:text-white transition-colors" aria-label="Close">
          <X className="w-7 h-7" />
        </button>
        {/* Stepper */}
        <div className="flex justify-between items-center px-10 pt-8 pb-2">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-[#232a22] border-2 border-[#bfc7b6] flex items-center justify-center text-[#bfc7b6] font-bold text-lg">1</div>
            <span className="mt-2 text-xs text-[#bfc7b6] tracking-wide">Select Dates & Guests</span>
          </div>
          <div className="h-0.5 bg-[#3a4236] flex-1 mx-2" />
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-[#232a22] border-2 border-[#3a4236] flex items-center justify-center text-[#3a4236] font-bold text-lg">2</div>
            <span className="mt-2 text-xs text-[#3a4236] tracking-wide">Choose Room</span>
          </div>
          <div className="h-0.5 bg-[#3a4236] flex-1 mx-2" />
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-[#232a22] border-2 border-[#3a4236] flex items-center justify-center text-[#3a4236] font-bold text-lg">3</div>
            <span className="mt-2 text-xs text-[#3a4236] tracking-wide">Guest Info</span>
          </div>
          <div className="h-0.5 bg-[#3a4236] flex-1 mx-2" />
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-[#232a22] border-2 border-[#3a4236] flex items-center justify-center text-[#3a4236] font-bold text-lg">4</div>
            <span className="mt-2 text-xs text-[#3a4236] tracking-wide">Payment</span>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-[#3a4236] mx-10 mb-8" />
        {/* Form */}
        <form className="space-y-6 px-10 pb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[#bfc7b6] mb-2 font-medium">Check In</label>
              <div className="relative">
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236] focus:border-[#bfc7b6] focus:outline-none"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[#bfc7b6] mb-2 font-medium">Check Out</label>
              <div className="relative">
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236] focus:border-[#bfc7b6] focus:outline-none"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[#bfc7b6] mb-2 font-medium">Guests</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236] focus:border-[#bfc7b6] focus:outline-none pr-10"
              />
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#bfc7b6] text-[#232a22] px-4 py-3 rounded font-semibold text-lg tracking-wide shadow hover:bg-[#d6e0c7] transition-colors mt-2">
            Check Availability
          </button>
        </form>
      </div>
      <div className="mt-8 text-[#bfc7b6] text-center max-w-xl">
        <p>
          The design offers a smooth, intuitive process for selecting dates and guest details, ensuring a hassle-free start to the booking journey.
        </p>
      </div>
    </div>
  );
};

export default DateGuestSelectionPage;
