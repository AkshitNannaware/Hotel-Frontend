import React, { useState } from "react";

const DateGuestSelectionPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <div className="bg-[#232a22] min-h-screen flex flex-col items-center py-12">
      <div className="w-full max-w-lg bg-[#2e352a] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-8">Select Dates & Guests</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-white mb-2">Check In</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236]"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Check Out</label>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236]"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Guests</label>
            <input
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 rounded bg-[#232a22] text-white border border-[#3a4236]"
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded mt-4">
            Check Availability
          </button>
        </form>
      </div>
      <div className="mt-8 text-white text-center max-w-xl">
        <p>
          The design offers a smooth, intuitive process for selecting dates and guest details, ensuring a hassle-free start to the booking journey.
        </p>
      </div>
    </div>
  );
};

export default DateGuestSelectionPage;
