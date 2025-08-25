"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// useEffect(() => {
//   if (typeof window !== "undefined") {
//     import("typeit").then(({ default: Typeit }) => {
//       new Typeit("#text_ketik", {
//         afterStep: function (instance) {
//           instance.getElement().style.color = getRandomColor();
//         },
//       }).go();
//     });
//   }
// }, []);

// --- DATA FOR OUR INTERACTIVE OBJECTS ---
// This is where you customize everything!
// 'id' is a unique name.
// 'position' is where it appears on the screen (top and left percentages).
// 'content' is what shows up in the pop-up modal.
const hotspotsData = [
  {
    id: "photoFrame",
    position: { top: "25%", left: "15%" },
    content: {
      title: "Our First Photo!",
      text: "Remember how nervous we were? We tried to look cool but ended up just being goofy. My favorite picture.",
      image: "/foto1.jpg", // Your image from the 'public' folder
    },
  },
  {
    id: "laptop",
    position: { top: "60%", left: "30%" },
    content: {
      title: "Late Night Movie Marathons",
      text: "All the shows we've binge-watched together. This laptop has seen more drama than a telenovela!",
      image: "/movie-popcorn.jpg", // A picture of popcorn or a movie poster
    },
  },
  {
    id: "plant",
    position: { top: "55%", left: "75%" },
    content: {
      title: "Growing Together",
      text: "Like this little plant, we've grown so much together. Thank you for helping me grow.",
      image: "/plant-photo.jpg", // A picture of a plant or you two in nature
    },
  },
  {
    id: "book",
    position: { top: "80%", left: "55%" },
    content: {
      title: "The Next Chapter",
      text: "I can't wait to see what the next chapter holds for us. It's going to be the best one yet.",
      link: "/coupons", // This one will link to the next page!
    },
  },
];

// This is a new component for our pop-up window
function Modal({ content, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{content.title}</h2>
        {content.image && <Image src={content.image} alt={content.title} width={300} height={300} className="modal-image" />}
        <p>{content.text}</p>
        {content.link ? (
          <Link href={content.link} className="button-link">
            Lets Go!
          </Link>
        ) : (
          <button onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
}

export default function InteractiveRoomPage() {
  const [modalContent, setModalContent] = useState(null);
  const [showWishForm, setShowWishForm] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [wish, setWish] = useState("");

  const handleHotspotClick = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleCakeClick = () => {
    if (!candleLit) {
      setCandleLit(true);
      setShowWishForm(true);
    }
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    // Handle the wish submission here
    console.log("Wish submitted:", wish);
    setShowWishForm(false);
    setCandleLit(false);
    setWish("");
  };

  return (
    <main className="interactive-room-container">
      <Image
        src="/room-background.jpg" // Your main background image!
        alt="Interactive Memory Room"
        layout="fill"
        objectFit="cover"
        className="background-image"
      />
      <div className="room-title">
        <h1>The Room of Our Memories</h1>
        <p>Click on the glowing objects to explore...</p>
      </div>

      {/* We map over our data to create the hotspots */}
      {hotspotsData.map((hotspot) => (
        <div key={hotspot.id} className="hotspot" style={{ top: hotspot.position.top, left: hotspot.position.left }} onClick={() => handleHotspotClick(hotspot.content)}></div>
      ))}

      {/* The modal will only appear when modalContent is not null */}
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}

      {/* Cake with candle */}
      <div className="cake-container" onClick={handleCakeClick}>
        <Image src="/cake128.png" alt="Birthday Cake" width={128} height={128} className="cake-image" />
        {candleLit && (
          <div className="candle-flame">
            <div className="flame-outer"></div>
            <div className="flame-inner"></div>
          </div>
        )}
      </div>

      {/* Wish form */}
      {showWishForm && (
        <div className="wish-form">
          <h3>Make a Birthday Wish!</h3>
          <form onSubmit={handleWishSubmit}>
            <input type="text" value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Enter your wish..." className="w-full p-2 mb-4 border rounded" />
            <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
              Make Wish
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
