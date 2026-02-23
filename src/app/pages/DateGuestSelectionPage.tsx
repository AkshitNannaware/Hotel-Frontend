import React, { useState } from "react";
import { Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DateGuestSelectionPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/room-selection");
  };

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-[#3f4a40] border-b border-[#5b6659] py-4">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl text-[#efece6] font-bold">Select Dates & Guests</h2>
        </div>
      </div>
      <div className="min-h-screen bg-[#3f4a40] text-[#efece6] py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-[#2e352a] border border-[#5b6659] rounded-3xl shadow-2xl p-8 mt-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[#d7d2c5] mb-2 font-medium">Check In</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#232a22] text-white border border-[#5b6659] focus:border-[#bfc7b6] focus:outline-none"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[#d7d2c5] mb-2 font-medium">Check Out</label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#232a22] text-white border border-[#5b6659] focus:border-[#bfc7b6] focus:outline-none"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[#d7d2c5] mb-2 font-medium">Guests</label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={e => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-[#232a22] text-white border border-[#5b6659] focus:border-[#bfc7b6] focus:outline-none pr-10"
                />
                <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#bfc7b6] pointer-events-none" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#bfc7b6] text-[#232a22] px-4 py-3 rounded-xl font-semibold text-lg tracking-wide shadow hover:bg-[#d7d0bf] transition-colors mt-2">
              Check Availability
            </button>
          </form>
        </div>
        <div className="mt-8 text-[#d7d2c5] text-center max-w-xl">
          <p>
            The design offers a smooth, intuitive process for selecting dates and guest details, ensuring a hassle-free start to the booking journey.
          </p>
        </div>
      </div>
    </>
  );
};

export default DateGuestSelectionPage;
