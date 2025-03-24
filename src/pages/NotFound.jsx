// src/pages/NotFound.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomFact } from "../utils/banterFacts";

const NotFound = () => {
  const [fact, setFact] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setFact(getRandomFact());

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#dc2626" }}>
        404 - Trophy Cabinet Not Found
      </h1>

      <p style={{ marginTop: "1rem", fontSize: "1.1rem", color: "#374151" }}>
        Sorry, this page doesn’t exist… just like Tottenham’s recent silverware.
      </p>

      <Link
        to="/"
        style={{
          marginTop: "1.5rem",
          color: "#1d4ed8",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        Return to the mausoleum
      </Link>

      <p
        style={{
          marginTop: "2rem",
          fontSize: "0.9rem",
          fontStyle: "italic",
          color: "#6b7280",
        }}
      >
        If you can’t hear anything, click below to experience the audio heartbreak manually.
      </p>

      <audio ref={audioRef} src="/sounds/has-anyone.mp3" preload="auto" />

      <button
        onClick={toggleSound}
        style={{
          marginTop: "0.5rem",
          backgroundColor: "#1f2937",
          color: "#ffffff",
          border: "1px solid #334155",
          borderRadius: "5px",
          padding: "0.5rem 1.5rem",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        {isPlaying ? "Stop the pain" : "Play Sound"}
      </button>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "1rem",
          color: "#ca8a04",
          maxWidth: "600px",
        }}
      >
        💡 <em>{fact}</em>
      </p>
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
  );
};

export default NotFound;
