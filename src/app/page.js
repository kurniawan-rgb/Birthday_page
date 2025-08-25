/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import asset from "../../src/lib/asset";
import "../../public/cake.css";
import Link from "next/link";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function Home() {
  // Deklarasi state utama di atas
  const [lampOn, setLampOn] = useState(false);
  const [candleOn, setCandleOn] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showSurpriseBtn, setShowSurpriseBtn] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [igniting, setIgniting] = useState(false);
  const [showWishForm, setShowWishForm] = useState(false);
  const [wish, setWish] = useState("");
  const [savedWish, setSavedWish] = useState("");
  const [typedText, setTypedText] = useState("");
  const typingRef = useRef({ timer: null, sentences: [], si: 0, ci: 0, cancelled: false });
  const [showMessageTyping, setShowMessageTyping] = useState(false);
  const messageRef = useRef({ timer: null, cancelled: false });
  const [messagesDone, setMessagesDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const confettiTimerRef = useRef(null);
  const confettiIntervalRef = useRef(null);
  const messageLines = React.useMemo(
    () => [
      "Halo Sayang",
      "Hari Ini adalah hari spesial ta",
      "tawwa tambah tua mi",
      "hahahha tapi tetap ki cantik lah",
      "tambah banyak mi na pikir",
      "sudah banyak kita lewati",
      "mulai senang....",
      "sudah senang kita sedih lagi",
      "kadang juga marah-maraj hahhaha",
      "tapi itu mi yang di bilang ",
      "hidup hehehhe",
      "apalagi sekarang koas ki",
      "bertubi-tubi cobaan hahha",
      "mulai cari pasien susah, belum lagi d kmpus",
      "tapi yakin ka bisa semua ki lalui",
      "Doakan untuk kita ",
      "di umur ta ini.....",
      "semoga selalu ki tambah sabar",
      "ini paling utama",
      "semoga bisa ki gapai semua apa-apa yang kita harapkan",
      "dan bisa ki jdi lebih baik kedepannya",
      "semoga tambah banyak rezeki ta",
      "kurangi marah-maraah hehheh",
      "satu pi terakhir",
      "tetap ki rendah hati dimanapun berada",
      "masih banyak mau di sampaikan tapi capek menulis di web",
      "hahahhaha",
      "love youu ......",
      "ingat trnya bos ku hehhehheh",
      "di sari laut mo",
      "yg penting sama kita",
      "sehat-sehat ki",
      "drg(soon) Nur Aqilah.,S.KG",
    ],
    []
  );
  const audioRef = useRef(null);
  // --- Countdown config: set the target ISO datetime here (server/local time) ---
  // Example: '2025-08-26T00:00:00' will unlock at midnight 26 Aug 2025
  const countdownTargetRef = useRef(new Date("2025-08-26T00:00:00"));
  const [countdownActive, setCountdownActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  // helper to format ms -> HH:MM:SS
  const fmt = (ms) => {
    if (ms <= 0) return "00:00:00";
    const total = Math.floor(ms / 1000);
    const s = total % 60;
    const m = Math.floor((total / 60) % 60);
    const h = Math.floor(total / 3600);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // countdown timer effect
  useEffect(() => {
    const target = countdownTargetRef.current;
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        setCountdownActive(false);
        return true;
      }
      setTimeLeft(fmt(diff));
      return false;
    };

    // run immediately and then every 1s
    if (update()) return;
    const id = setInterval(() => {
      if (update()) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Timer untuk memunculkan elemen secara berurutan
  useEffect(() => {
    if (lampOn) {
      // Nama muncul 2 detik setelah Happy Birthday
      const nameTimer = setTimeout(() => setShowName(true), 2000);
      // Tombol surprise muncul 1 detik setelah question
      const surpriseTimer = setTimeout(() => setShowSurpriseBtn(true), 4500);

      return () => {
        clearTimeout(nameTimer);
        clearTimeout(surpriseTimer);
      };
    } else {
      setShowName(false);

      setShowSurpriseBtn(false);
      setShowCake(false);
    }
  }, [lampOn]);

  // Balon interaktif
  const balloonImages = React.useMemo(() => [asset("/b1.png"), asset("/b2.png"), asset("/b3.png"), asset("/b4.png"), asset("/b5.png"), asset("/b6.png")], []);
  const [balloons, setBalloons] = useState([]);

  // Generate balon baru
  useEffect(() => {
    if (lampOn) {
      const arr = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 90 + 5, // 10% - 90% lebar
        bottom: Math.random() * 40, // 0-40vh
        speed: Math.random() * 0.7 + 0.3, // 0.3-1 px/frame
        img: balloonImages[Math.floor(Math.random() * balloonImages.length)],
        color: "#fff",
      }));
      setBalloons(arr);
    } else {
      setBalloons([]);
    }
  }, [lampOn, balloonImages]);

  // Animasi balon terbang
  useEffect(() => {
    if (!lampOn || balloons.length === 0) return;
    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev.map((b) => {
          let newBottom = b.bottom + b.speed;
          // Jika balon sudah di atas, reset ke bawah
          if (newBottom > 90) newBottom = 0;
          return { ...b, bottom: newBottom };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, [lampOn, balloons.length]);

  // Interaksi klik balon
  const handleBalloonClick = (id) => {
    setBalloons((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              speed: b.speed + 1.2, // tambah kecepatan
              color: getRandomColor(), // ubah warna
            }
          : b
      )
    );
  };

  const handleLampClick = () => {
    setLampOn((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (lampOn) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [lampOn]);

  // Load saved wish from sessionStorage (web memory) on mount
  useEffect(() => {
    // ensure any leftover session key is cleared — wish should not survive reload
    try {
      if (typeof window !== "undefined") sessionStorage.removeItem("birthdayWish");
    } catch (err) {
      console.warn("Could not clear saved wish", err);
    }
  }, []);

  // Typing animation: sentence-by-sentence
  useEffect(() => {
    // use a local copy for safe cleanup (avoids stale ref lint warning)
    const t = typingRef.current;
    // clear any existing timers
    t.cancelled = false;
    if (t.timer) {
      clearTimeout(t.timer);
      t.timer = null;
    }
    setTypedText("");

    if (!savedWish) return () => {};

    // split into sentences (keep punctuation)
    const sentences = savedWish
      .match(/[^.!?]+[.!?]*|\n+/g)
      ?.map((s) => s.trim())
      .filter(Boolean) || [savedWish];
    t.sentences = sentences;
    t.si = 0;
    t.ci = 0;

    const typeChar = () => {
      if (t.cancelled) return;
      const { si, ci, sentences } = t;
      if (si >= sentences.length) return;
      const sentence = sentences[si];
      if (ci < sentence.length) {
        setTypedText((prev) => prev + sentence.charAt(ci));
        t.ci += 1;
        t.timer = setTimeout(typeChar, 40 + Math.random() * 60);
      } else {
        // end of sentence: pause before next sentence
        t.si += 1;
        t.ci = 0;
        if (t.si < sentences.length) {
          t.timer = setTimeout(() => {
            // small separator then continue
            setTypedText((prev) => prev + " ");
            typeChar();
          }, 600 + Math.random() * 600);
        }
      }
    };

    // start typing
    t.timer = setTimeout(typeChar, 300);

    return () => {
      t.cancelled = true;
      if (t.timer) clearTimeout(t.timer);
    };
  }, [savedWish]);

  // stop continuous confetti when messages are done
  useEffect(() => {
    if (messagesDone) {
      // stop interval
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
        confettiIntervalRef.current = null;
      }
      // let existing pieces finish then clear
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
      confettiTimerRef.current = setTimeout(() => {
        setShowConfetti(false);
        setConfettiPieces([]);
        confettiTimerRef.current = null;
      }, 2600);
    }
    return () => {};
  }, [messagesDone]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (confettiIntervalRef.current) clearInterval(confettiIntervalRef.current);
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current);
    };
  }, []);

  // per-sentence typing: types each line from messageLines, clears it, then continues
  useEffect(() => {
    if (!showMessageTyping) return;

    const r = messageRef.current;
    r.cancelled = false;

    let si = 0;

    const typeSentence = (sentence, ci = 0) => {
      if (r.cancelled) return;
      if (ci <= sentence.length) {
        setTypedText(sentence.slice(0, ci));
        r.timer = setTimeout(() => typeSentence(sentence, ci + 1), 30 + Math.random() * 40);
      } else {
        // finished sentence: wait briefly, then clear and move to next
        r.timer = setTimeout(() => {
          if (r.cancelled) return;
          setTypedText("");
          si += 1;
          if (si >= messageLines.length) {
            // done all lines
            setShowMessageTyping(false);
            // ensure wish is cleared
            setSavedWish("");
            setMessagesDone(true);
            return;
          }
          typeSentence(messageLines[si], 0);
        }, 700 + Math.random() * 400);
      }
    };

    // start with first sentence
    if (messageLines.length > 0) typeSentence(messageLines[0], 1);

    return () => {
      r.cancelled = true;
      if (r.timer) clearTimeout(r.timer);
    };
  }, [showMessageTyping, messageLines]);

  return (
    <main className="center-content flex flex-row items-center justify-center w-full">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map((p) => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                background: p.bg,
                width: p.size,
                height: p.size * 0.6,
                borderRadius: 2,
                transform: `rotate(${p.rotate}deg)`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}
      {/* Countdown overlay: blocks interaction until target time */}
      {countdownActive && (
        <div className="countdown-overlay">
          <div className="countdown-box">
            <h2>Coming Soon</h2>
            <div className="countdown-clock">{timeLeft}</div>
            <p>Site will unlock when the clock reaches 00:00</p>
          </div>
        </div>
      )}
      {/* Foto kiri */}
      {/* <div className="flex flex-col items-center justify-center mr-4">
        <div className="photo-frame">
          <img src="/foto1.jpg" alt="Foto kiri" className="photo-img" />
        </div>
      </div> */}
      <div className="flex-1 flex flex-col items-center">
        {/* Lamp image */}
        <div className="flex flex-row items-center gap-4 lamp-row">
          <img src={lampOn ? asset("/bulb_red.png") : asset("/bulb.png")} alt="Lampu" className={`lamp-img ${lampOn ? "lamp-glow-red" : ""}`} />
          <img src={lampOn ? asset("/bulb_blue.png") : asset("/bulb.png")} alt="Lampu" className={`lamp-img ${lampOn ? "lamp-glow-blue" : ""}`} />
          <img src={lampOn ? asset("/bulb_yellow.png") : asset("/bulb.png")} alt="Lampu" className={`lamp-img ${lampOn ? "lamp-glow-yellow" : ""}`} />
          <img src={lampOn ? asset("/bulb_green.png") : asset("/bulb.png")} alt="Lampu" className={`lamp-img ${lampOn ? "lamp-glow-green" : ""}`} />
          <img src={lampOn ? asset("/bulb_pink.png") : asset("/bulb.png")} alt="Lampu" className={`lamp-img ${lampOn ? "lamp-glow-pink" : ""}`} />
        </div>

        {/* Balloon decoration, animates in when lamp/music on */}
        {lampOn && <img src={asset("/Balloon-Border.png")} alt="Dekorasi Balon" className="mb-6 ml-20 mr-20 mt-10  balloon-border" />}

        {/* Animated Happy Birthday text, appears one by one when lamp/music on */}
        {lampOn && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center items-center gap-2 happy-text">
              {"Happy Birthday".split("").map((char, idx) => (
                <span key={idx} className="happy-char" style={{ "--char-delay": `${0.2 + idx * 0.15}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

            {/* Nama yang ulang tahun */}
            {showName && <div className="birthday-name">Kebbong Sayangku</div>}

            {/* Surprise button */}
            {showSurpriseBtn && (
              <button
                onClick={() => {
                  // show cake and ignite candle
                  setShowCake(true);
                  setCandleLit(true);
                  setIgniting(true);
                  setTimeout(() => setIgniting(false), 700);
                }}
                className="surprise-button"
              >
                Click Surprise! ✨
              </button>
            )}

            {/* Cake with interactive candle (uses CSS cake markup) */}
            {showCake && (
              <div
                className={`cake-wrapper ${candleLit ? "lit" : ""} ${igniting ? "ignite" : ""}`}
                onClick={() => {
                  if (!candleLit) {
                    setCandleLit(true);
                    setIgniting(true);
                    setTimeout(() => setIgniting(false), 700);
                  } else {
                    // open wish form before extinguish
                    setShowWishForm(true);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="cake">
                  <div className="velas">
                    <div className="fuego"></div>
                    <div className="fuego"></div>
                    <div className="fuego"></div>
                    <div className="fuego"></div>
                  </div>
                  <div className="cobertura"></div>
                  <div className="bizcocho"></div>
                </div>
              </div>
            )}

            {/* Wish form modal - shown before extinguishing candle */}
            {showWishForm && (
              <div className="modal-backdrop" onClick={() => setShowWishForm(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <h2>Make a Birthday Wish</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("Wish submitted:", wish);
                      setSavedWish(wish);
                      setShowWishForm(false);
                      setCandleLit(false); // extinguish candle after wish
                      setWish("");
                      // start continuous confetti bursts until messagesDone
                      setShowConfetti(true);
                      // immediate burst
                      const burst = (baseId = 0) =>
                        Array.from({ length: 40 }).map((_, i) => ({
                          id: `${Date.now()}-${baseId}-${i}`,
                          left: Math.random() * 100,
                          bg: `hsl(${Math.floor(Math.random() * 360)}deg, 90%, 60%)`,
                          delay: Math.random() * 1.2,
                          size: Math.floor(Math.random() * 10) + 6,
                          rotate: Math.floor(Math.random() * 360),
                        }));
                      setConfettiPieces((prev) => [...prev, ...burst(0)]);
                      // start interval for repeated bursts
                      if (!confettiIntervalRef.current) {
                        confettiIntervalRef.current = setInterval(() => {
                          setConfettiPieces((prev) => [...prev, ...burst(prev.length + 1)]);
                        }, 900);
                      }
                    }}
                  >
                    <input type="text" value={wish} onChange={(e) => setWish(e.target.value)} placeholder="Type your wish..." className="w-full p-2 mb-4 border rounded" />
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      <button type="submit" className="surprise-button">
                        Make Wish
                      </button>
                      <button type="button" className="surprise-button" onClick={() => setShowWishForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {typedText && (
              <p className="mb-4 whitespace-pre-wrap">
                <span className="font-bold text-2xl ">{typedText}</span>
              </p>
            )}

            {/* Show button after a wish is present */}
            {savedWish && !showMessageTyping && (
              <div style={{ marginTop: 8 }}>
                <button
                  className="surprise-button"
                  onClick={() => {
                    // start the message-per-sentence typing; remove the wish
                    setSavedWish("");
                    setTypedText("");
                    messageRef.current.cancelled = false;
                    setMessagesDone(false);
                    setShowMessageTyping(true);
                  }}
                >
                  See a message for you
                </button>
              </div>
            )}
            {/* After messages complete, show button to go to /bare */}
            {messagesDone && (
              <div style={{ marginTop: 10 }}>
                <Link href="/birthday">
                  <button className="surprise-button">See more</button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Balloons interactive flying up */}
        {lampOn && (
          <div className="balloon-area">
            {balloons.map((b) => (
              <img
                key={b.id}
                src={b.img}
                alt="Balon"
                onClick={() => handleBalloonClick(b.id)}
                className="balloon-img"
                style={{
                  "--balloon-left": `${b.left}%`,
                  "--balloon-bottom": `${b.bottom}vh`,
                  "--balloon-color": b.color,
                }}
              />
            ))}
          </div>
        )}

        {/* Lamp button */}
        <button className="button-lamp">
          {!lampOn && <h2 className="lamp-btn-text">Click Me</h2>}
          <img src={lampOn ? asset("/offf_pulp.png") : asset("/on_pulp.png")} alt="Lampu" className="lamp-btn-img" onClick={handleLampClick} />
        </button>

        {/* Audio element for music */}
        <audio ref={audioRef} src={asset("/selamat_ultah.mp3")} preload="auto" />
      </div>
      {/* <div className="flex flex-col items-center justify-center ml-4">
        <div className="photo-frame">
          <img src="/foto2.jpg" alt="Foto kanan" className="photo-img" />
        </div>
      </div> */}
    </main>
  );
}
