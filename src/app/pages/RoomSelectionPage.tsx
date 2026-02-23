import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomSelectionPage = () => {
  const API_BASE = (import.meta.env?.VITE_API_URL as string | undefined) || 'http://localhost:5000';
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRooms = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetch(`${API_BASE}/api/rooms`);
        if (!response.ok) {
          throw new Error(`Failed to load rooms (${response.status})`);
        }
        const data = await response.json();
        setRooms((data as any[]).map((room) => ({
          id: room._id || room.id,
          name: room.name,
          image: room.images?.[0] || '',
          price: room.price,
          rating: room.rating || 4.7,
          guests: room.maxGuests || 1,
          type: room.type,
          available: room.available ?? true,
        })));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load rooms';
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    };
    loadRooms();
  }, [API_BASE]);

  return (
    <>
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-[#3f4a40] border-b border-[#5b6659] py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl text-[#efece6] font-bold">Choose Your Room</h2>
        </div>
      </div>
      <div className="min-h-screen bg-[#3f4a40] text-[#efece6] py-8 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-[#2e352a] border border-[#5b6659] rounded-3xl shadow-2xl p-8 mt-8">
          {isLoading && (
            <div className="text-center py-8 text-[#bfc7b6]">Loading rooms...</div>
          )}
          {loadError && (
            <div className="text-center py-8 text-red-400">{loadError}</div>
          )}
          {!isLoading && !loadError && rooms.length === 0 && (
            <div className="text-center py-8 text-[#bfc7b6]">No rooms available.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, idx) => (
              <div key={room.id || idx} className="bg-[#232a22] border border-[#5b6659] rounded-2xl shadow p-6 flex flex-col items-center">
                <img src={room.image} alt={room.name} className="rounded-xl mb-4 w-full h-32 object-cover border border-[#5b6659]" />
                <h3 className="text-lg font-semibold text-[#efece6] mb-2">{room.name}</h3>
                <div className="flex items-center text-yellow-400 mb-2">
                  <span className="mr-1">★</span>
                  <span>{room.rating}</span>
                  <span className="ml-2 text-[#efece6]">({room.guests} guests)</span>
                </div>
                <div className="text-[#bfc7b6] font-bold mb-2">${room.price}</div>
                <button
                  className="w-full bg-[#bfc7b6] text-[#232a22] px-4 py-3 rounded-xl font-semibold text-base tracking-wide shadow hover:bg-[#d7d0bf] transition-colors mt-auto"
                  onClick={() => navigate('/select-dates')}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-[#d7d2c5] text-center max-w-xl">
          <p>
            The design provides an intuitive selection process, allowing users to easily explore room options and make their choice with clear details and visuals for a seamless experience.
          </p>
        </div>
      </div>
    </>
  );
};

export default RoomSelectionPage;