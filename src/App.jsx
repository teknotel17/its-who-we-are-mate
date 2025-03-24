import { useEffect, useState } from "react";
import "./App.css";

// Firebase Firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// React Router v6 (no BrowserRouter or Router here, because it's in main.jsx)
import { Routes, Route, Navigate } from "react-router-dom";

// Firebase Auth
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// Your pages
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import TrophyCabinet from "./pages/TrophyCabinet";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";



//
// SOUND EFFECTS LOGIC
//
let soundIndex = 0;
const playRandomSound = () => {
  const sounds = [
    "/sounds/who-mate.mp3",
    "/sounds/sad-trombone.mp3",
    "/sounds/laugh.mp3",
    "/sounds/sad-violin.mp3",
  ];
  const audio = new Audio(sounds[soundIndex]);
  audio.volume = 0.3;
  audio.play();
  soundIndex = (soundIndex + 1) % sounds.length;
};

function App() {
  // AUTH STATE
  const [user, setUser] = useState(null);

  // TROPHY / STATS / JOKES / ETC. STATE
  const [timeSinceTrophy, setTimeSinceTrophy] = useState("");
  const [funnyStat, setFunnyStat] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [statsJokes, setStatsJokes] = useState([]);
  const [results, setResults] = useState([]);
  const [embarrassingResult, setEmbarrassingResult] = useState(null);
  const [signings, setSignings] = useState([]);
  const [randomSigning, setRandomSigning] = useState(null);
  const [dvdClips, setDvdClips] = useState([]);
  const [spursClip, setSpursClip] = useState("");

  //
  // INITIAL FETCH & AUTH LISTENER
  //
  useEffect(() => {
    const auth = getAuth();

    // Listen for login/logout changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fetch Firestore data
    const fetchData = async () => {
      try {
        // Hero images
        const heroSnap = await getDocs(collection(db, "heroImages"));
        const heroUrls = heroSnap.docs.map((doc) => doc.data().url);
        if (heroUrls.length > 0) {
          const randomIndex = Math.floor(Math.random() * heroUrls.length);
          setHeroImage(heroUrls[randomIndex]);
        }

        // Stats / Jokes
        const statsSnap = await getDocs(collection(db, "statsJokes"));
        const statsArray = statsSnap.docs.map((doc) => doc.data().text);
        setStatsJokes(statsArray);

        // Embarrassing Results
        const resultsSnap = await getDocs(collection(db, "embarrassingResults"));
        const resultsArray = resultsSnap.docs.map((doc) => doc.data());
        setResults(resultsArray);

        // Signings
        const signingsSnap = await getDocs(collection(db, "signings"));
        const signingsArray = signingsSnap.docs.map((doc) => doc.data());
        setSignings(signingsArray);

        // DVD clips
        const dvdSnap = await getDocs(collection(db, "dvdClips"));
        const dvdArray = dvdSnap.docs.map((doc) => doc.data().url);
        setDvdClips(dvdArray);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();

    // TROPHY TIMER
    const updateTimer = () => {
      const lastTrophyDate = new Date("2008-02-24T17:00:00Z");
      const now = new Date();
      const diff = now - lastTrophyDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365.25)) /
          (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeSinceTrophy(
        `${years} years, ${days} days, ${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  //
  // LOGOUT
  //
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  //
  // SITE LOGIC
  //
  const showFunnyStat = () => {
    if (statsJokes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * statsJokes.length);
    setFunnyStat(statsJokes[randomIndex]);
    playRandomSound();
  };

  const showEmbarrassingResult = () => {
    if (results.length === 0) return;
    const randomIndex = Math.floor(Math.random() * results.length);
    setEmbarrassingResult(results[randomIndex]);
    playRandomSound();
  };

  const showRandomSigning = () => {
    if (signings.length === 0) return;
    const randomIndex = Math.floor(Math.random() * signings.length);
    setRandomSigning(signings[randomIndex]);
    playRandomSound();
  };

  const showRandomSpursClip = () => {
    if (dvdClips.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dvdClips.length);
    setSpursClip(dvdClips[randomIndex]);
    playRandomSound();
  };

  //
  // RENDER ROUTES
  //
  return (
    <Routes>
      {/* LOGIN ROUTE */}
      <Route
        path="login"
        element={
          user ? (
            // If user is logged in, go to /admin
            <Navigate to="/admin" replace />
          ) : (
            // Otherwise, show the Login page
            <Login />
          )
        }
      />

      {/* ADMIN ROUTE (PROTECTED) */}
      <Route
        path="admin"
        element={
          user ? (
            <>
              {/* Admin page content */}
              <Admin />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            // If not logged in, go to /login
            <Navigate to="/login" replace />
          )
        }
      />

      {/* TROPHY CABINET ROUTE (OPTIONAL) */}
      {/* 
        If you need a separate route for /trophy-cabinet, define it here, e.g.:
        <Route path="/trophy-cabinet" element={<TrophyCabinet404 />} />
      */}
import TrophyCabinet from "./pages/TrophyCabinet";

// ...

<Route path="/trophy-cabinet" element={<TrophyCabinet />} />

      {/* MAIN APP ROUTE */}
      <Route
        path=""
        element={

          <div className="container">
            {/* HEADER BANNER */}
<div className="site-header">
  <div className="header-inner">
    <img src="/logo.png" alt="Spurs Logo" className="header-logo" />
    <div className="header-text">
      <h1>It's Who We Are Mate</h1>
      <p>The Tottenham Mausoleum</p>
    </div>
  </div>
</div>

<div className="ad-slot">
  <img
    src="/ads/no-cup.png"
    alt="NoCup Finance Ad"
    className="ad-banner"
    style={{ width: "100%", maxWidth: "728px", height: "auto" }}
  />
</div>

            {heroImage && (
              <img src={heroImage} alt="Spurs Banter" className="hero-img" />
            )}

            <div className="title-bar">
              <div className="title-side">🐓⚽</div>
              <h1 className="title-center">
                How Long Has It Been Since Spurs Won a Trophy?
              </h1>
              <div className="title-side">⚽🐓</div>
            </div>

            <h2 className="timer">{timeSinceTrophy}</h2>
            <p className="subtext">Spoiler: It’s been a while.</p>

            <div className="ad-slot">
  <img
    src="/ads/spurs-singles.png"
    alt="Spurs Singles Ad"
    className="ad-banner"
    style={{ width: "100%", maxWidth: "728px", height: "auto" }}
  />
</div>


            <a href="/trophy-cabinet" className="trophy-link">
              🏆 Visit Tottenham’s Trophy Cabinet
            </a>

            <div className="button-stack">
              <button
                className="stat-button"
                onClick={() => {
                  showFunnyStat();
                }}
              >
                Give me a funny stat
              </button>

              {funnyStat && <p className="stat-text">{funnyStat}</p>}

              <button
                className="result-button"
                onClick={() => {
                  showEmbarrassingResult();
                }}
              >
                Reveal an embarrassing result
              </button>

              {embarrassingResult && (
                <div className="match-box">
                  <h3 className="match-score">{embarrassingResult.score}</h3>
                  <p className="match-details">{embarrassingResult.details}</p>
                  <a
                    href={embarrassingResult.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="match-link"
                  >
                    Read more
                  </a>
                </div>
              )}

              <button
                className="signing-button"
                onClick={() => {
                  showRandomSigning();
                }}
              >
                Show me a signing of the season
              </button>
            </div>

            {randomSigning && (
              <div className="signing-card">
                <img
                  src={randomSigning.image}
                  alt={randomSigning.name}
                  className="signing-img"
                />
                <h3>
                  <a
                    href={randomSigning.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {randomSigning.name}
                  </a>
                </h3>
                <p>📅 Year Signed: {randomSigning.year}</p>
                <p>💰 Fee: {randomSigning.fee}</p>
                <p>
                  📊 Apps: {randomSigning.apps} | Goals: {randomSigning.goals} | Assists:{" "}
                  {randomSigning.assists}
                </p>
                <p className="signing-bio">"{randomSigning.bio}"</p>
              </div>
            )}

<div className="ad-slot">
  <img
    src="/ads/no-cup.png"
    alt="NoCup Finance Ad"
    className="ad-banner"
    style={{ width: "100%", maxWidth: "728px", height: "auto" }}
  />
</div>


            <div className="dvd-section">
              <h2>💿 Spurs’ Greatest Moments: The DVD</h2>
              <button
                className="dvd-button"
                onClick={() => {
                  showRandomSpursClip();
                }}
              >
                Play a classic moment
              </button>

              {spursClip && (
                <div className="video-wrapper">
                  <iframe
                    width="100%"
                    height="315"
                    src={spursClip}
                    title="Spurs Moment"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            <footer className="site-footer">
  <p>
    © 2025{" "}
    <a href="https://itswhowearemate.com" target="_blank" rel="noopener noreferrer">
      itswhowearemate.com
    </a>{" "}
    — No trophies were harmed in the making of this site.
  </p>
  <p>
    <a
      href="https://github.com/teknotel17/its-who-we-are-mate"
      target="_blank"
      rel="noopener noreferrer"
    >
      View on GitHub
    </a>{" "}
    | Sponsored by <strong>NoCup Finance™</strong>
  </p>
  <p>
    <a href="/privacy-policy">Privacy Policy</a> |{" "}
    <a href="/terms-of-use">Terms of Use</a> |{" "}
    <a href="mailto:info@itswhowearemate.com">Contact</a>
  </p>
</footer>

          </div>
        }
      />
       {/* NEW LEGAL ROUTES */}
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/terms-of-use" element={<TermsOfUse />} />
            {/* 404 FALLBACK ROUTE */}
            <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
