import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import html2canvas from "html2canvas";

function RandomXI({ playRandomSound, isMuted }) {
  const [players, setPlayers] = useState([]);
  const [xi, setXI] = useState(null);
  const componentRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function generateRandomXI(players) {
    const getRandomFrom = (arr, count) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
  
    const GK = getRandomFrom(players.filter(p => p.position === "GK"), 1);
    const DF = getRandomFrom(players.filter(p => p.position === "DF"), 4);
    const MD = getRandomFrom(players.filter(p => p.position === "MD"), 3);
    const AT = getRandomFrom(players.filter(p => p.position === "AT"), 3);
  
    return {
      GK: GK[0],
      DF1: DF[0],
      DF2: DF[1],
      DF3: DF[2],
      DF4: DF[3],
      MD1: MD[0],
      MD2: MD[1],
      MD3: MD[2],
      AT1: AT[0],
      AT2: AT[1],
      AT3: AT[2],
    };
  }

  const handleDownloadXI = () => {
    if (!componentRef.current) return;
    
    html2canvas(componentRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then(canvas => {
      // Create a download link
      const link = document.createElement('a');
      link.download = 'legendary-xi.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };
  
  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, "signings"));
      const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlayers(all);
    };

    fetchPlayers();
  }, []);

  const buttonStyle = (bg) => ({
    backgroundColor: bg,
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  });
  
  // Define player positions with responsive coordinates
  const playerPositions = [
    { id: "GK",  top: "12%", left: "50%" },
    { id: "DF1", top: "32%", left: isMobile ? "15%" : "20%" },
    { id: "DF2", top: "32%", left: isMobile ? "38%" : "40%" },
    { id: "DF3", top: "32%", left: isMobile ? "62%" : "60%" },
    { id: "DF4", top: "32%", left: isMobile ? "85%" : "80%" },
    { id: "MD1", top: "56%", left: isMobile ? "25%" : "30%" },
    { id: "MD2", top: "56%", left: "50%" },
    { id: "MD3", top: "56%", left: isMobile ? "75%" : "70%" },
    { id: "AT1", top: "80%", left: "25%" },
    { id: "AT2", top: "80%", left: "50%" },
    { id: "AT3", top: "80%", left: "75%" },
  ];

  // Auto-generate XI when component mounts if players are available
  useEffect(() => {
    if (players.length > 0 && !xi) {
      setXI(generateRandomXI(players));
    }
  }, [players]);

  return (
    <div style={{ padding: "0.5rem 0", backgroundColor: "transparent", color: "#1e3a8a" }}>
      <h2 style={{ display: "none" }}>Tottenham Legendary XI Generator</h2>
  
      <button
        className="stat-button"
        onClick={() => {
          setXI(generateRandomXI(players));
          playRandomSound(isMuted);
        }}
        style={{ marginTop: "0.5rem" }}
      >
        Generate Random XI
      </button>

     {/* Pitch + Players Container */}
     <div
      id="pitch-container"
      ref={componentRef}
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Pitch Image */}
      <img
        src="/pitch.png"
        alt="Pitch"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      {/* Player Slots */}
      {playerPositions.map((pos) => {
        const player = xi?.[pos.id];

        return (
          <div
            id={`slot-${pos.id}`}
            key={pos.id}
            onClick={() => {
              if (!players.length || !xi) return;

              const el = document.getElementById(`content-${pos.id}`);
              if (el) {
                el.classList.remove("player-content-fade");
                void el.offsetWidth;
                el.classList.add("player-content-fade");
              }

              const usedIds = Object.values(xi).map((p) => p.id);
              const pool = players.filter(
                (p) =>
                  p.position === pos.id.slice(0, 2) &&
                  !usedIds.includes(p.id)
              );

              if (pool.length === 0) return;

              const random =
                pool[Math.floor(Math.random() * pool.length)];

              setXI((prev) => ({
                ...prev,
                [pos.id]: random,
              }));
              playRandomSound(isMuted);
            }}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              transform: "translate(-50%, -50%)",
              width: isMobile ? "90px" : "160px",
              height: isMobile ? "80px" : "130px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 5
            }}
            title={player?.name || ""}
          >
            {player && (
              <div
                id={`content-${pos.id}`}
                className="player-content-fade"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Shirt with player image */}
                <div style={{
                  width: isMobile ? "90px" : "160px",
                  height: isMobile ? "80px" : "130px",
                  backgroundImage: "url('/shirt.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: "drop-shadow(0 0 4px #001f3f)"
                }}>
                  {player.image && (
                    <img
                      src={player.image}
                      alt={player.name}
                      style={{
                        width: isMobile ? "45px" : "70px",
                        height: isMobile ? "45px" : "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: isMobile ? "2px solid #001f3f" : "4px solid #001f3f",
                      }}
                    />
                  )}
                </div>

                {/* Player name and stats - INVERTED COLORS */}
                <div style={{
                  position: "absolute",
                  bottom: isMobile ? "-25px" : "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#1e3a8a", // Navy blue background
                  padding: isMobile ? "2px 5px" : "3px 8px",
                  borderRadius: "4px",
                  minWidth: isMobile ? "80px" : "120px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  zIndex: 10,
                  border: "1px solid #facc15" // Adding yellow border to match site theme
                }}>
                  <div style={{
                    fontWeight: "bold",
                    fontSize: isMobile ? "9px" : "12px",
                    color: "#ffffff", // White text
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "1px"
                  }}>
                    {player.name}
                  </div>
                  <div style={{
                    fontSize: isMobile ? "7px" : "10px",
                    color: "#ffffff", // White text
                    textAlign: "center"
                  }}>
                    {isMobile ? 
                      `A:${player.apps} G:${player.goals} A:${player.assists}` :
                      `Apps: ${player.apps} | G: ${player.goals} | A: ${player.assists}`
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        className="mute-toggle-button"
        onClick={handleDownloadXI}
      >
        📸 Download This XI
      </button>
    </div>

    </div>
  );
}

export default RandomXI;