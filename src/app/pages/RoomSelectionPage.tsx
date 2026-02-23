import React from "react";
import { useNavigate } from "react-router-dom";

const RoomSelectionPage = () => {
  // Sample room data
  const rooms = [
    {
      name: "Eco Bliss Bungalow",
      image: "https://via.placeholder.com/200x120?text=Eco+Bliss+Bungalow",
      price: "$219/night",
      rating: 4.6,
      guests: 4,
    },
    {
      name: "Forest Heaven Suit",
      image: "https://via.placeholder.com/200x120?text=Forest+Heaven+Suit",
      price: "$289/night",
      rating: 4.8,
      guests: 4,
    },
    {
      name: "Nature Retreat Villa",
      image: "https://via.placeholder.com/200x120?text=Nature+Retreat+Villa",
      price: "$299/night",
      rating: 4.7,
      guests: 4,
    },
    {
      name: "Serene Leaf Cottage",
      image: "https://via.placeholder.com/200x120?text=Serene+Leaf+Cottage",
      price: "$239/night",
      rating: 4.6,
      guests: 4,
    },
    {
      name: "Green Nest Retreat",
      image: "https://via.placeholder.com/200x120?text=Green+Nest+Retreat",
      price: "$329/night",
      rating: 4.9,
      guests: 4,
    },
    {
      name: "Earth Cove Lodge",
      image: "https://via.placeholder.com/200x120?text=Earth+Cove+Lodge",
      price: "$249/night",
      rating: 4.7,
      guests: 4,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-[#232a22] min-h-screen flex flex-col items-center py-12">
      <div className="w-full max-w-4xl bg-[#2e352a] rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Choose Your Room</h2>
          <button className="bg-[#3a4236] text-white px-4 py-2 rounded">Filter</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, idx) => (
            <div key={idx} className="bg-[#232a22] rounded-lg shadow p-4 flex flex-col items-center">
              <img src={room.image} alt={room.name} className="rounded-lg mb-4 w-full h-32 object-cover" />
              <h3 className="text-lg font-semibold text-white mb-2">{room.name}</h3>
              <div className="flex items-center text-yellow-400 mb-2">
                <span className="mr-1">★</span>
                <span>{room.rating}</span>
                <span className="ml-2 text-white">({room.guests} guests)</span>
              </div>
              <div className="text-green-300 font-bold mb-2">{room.price}</div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-auto"
                onClick={() => navigate('/select-dates')}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-white text-center max-w-xl">
        <p>
          The design provides an intuitive selection process, allowing users to easily explore room options and make their choice with clear details and visuals for a seamless experience.
        </p>
      </div>
    </div>
  );
};

export default RoomSelectionPage;
