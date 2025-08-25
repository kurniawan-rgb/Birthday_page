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
      title: "Foto Pertama",
      text: "Hahah di sini masih malu-malu foto di depan bank tapi bukan yg ini",
      image: "/foto_qila/PHOTO-2025-08-18-16-30-13.jpg", // Your image from the 'public' folder
    },
  },
  {
    id: "laptop",
    position: { top: "60%", left: "30%" },
    content: {
      title: "Sama-sama manis",
      text: "Senyum ta' dan senyum ku sama-sama manis hhaha",
      image: "/foto_qila/foto-imut.jpg", // A picture of popcorn or a movie poster
    },
  },
  {
    id: "plant",
    position: { top: "55%", left: "75%" },
    content: {
      title: "Sama-sama tumbuh",
      text: "Semoga bisa ki tumbuh sama-sama dan berkembang sama",
      image: "/foto_qila/foto-animal.jpg", // A picture of a plant or you two in nature
    },
  },
  {
    id: "videoFrame",
    position: { top: "80%", left: "55%" },
    content: {
      title: "Video For you",
      text: "Maaf sayang ndak bisa terlalu perfect yang ku kasi ki",
      video: "/foto_qila/video_qila.mp4", // This one will link to the next page!
    },
  },
];

// This is a new component for our pop-up window
function Modal({ content, onClose, onVideoEnd }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{content.title}</h2>
        {content.image && <Image src={content.image} alt={content.title} width={300} height={300} className="modal-image" />}
        {/* Render video when provided */}
        {content.video && (
          <div style={{ margin: "12px 0" }}>
            <video className="modal-video" src={content.video} controls preload="metadata" onEnded={onVideoEnd}>
              Your browser does not support the video tag.
            </video>
          </div>
        )}
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
  const [clickedIds, setClickedIds] = useState([]);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const finalContent = {
    title: "See you tomorrow",
    text: "I Waiting for You Treat HAHAHHAH",
  };

  const handleHotspotClick = (id, content) => {
    setModalContent(content);
    setClickedIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const handleVideoEnd = () => {
    // show final modal only when all hotspots have been clicked
    if (clickedIds.length >= hotspotsData.length) {
      setModalContent(null);
      setShowFinalModal(true);
    }
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <main className="interactive-room-container">
      <div className="room-title">
        <h1>The Page Our Memory</h1>
        <p>Tekan ki satu-satu untuk lihat foto ta.. ayang</p>
      </div>
      {/* We map over our data to create the hotspots */}
      {hotspotsData.map((hotspot) => (
        <div key={hotspot.id} className="hotspot" style={{ top: hotspot.position.top, left: hotspot.position.left, alignSelf: "center" }} onClick={() => handleHotspotClick(hotspot.id, hotspot.content)}></div>
      ))}
      {/* The modal will only appear when modalContent is not null */}
      {modalContent && <Modal content={modalContent} onClose={closeModal} onVideoEnd={handleVideoEnd} />}
      {showFinalModal && <Modal content={finalContent} onClose={() => setShowFinalModal(false)} />}
    </main>
  );
}
