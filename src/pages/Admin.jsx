import React, { useState } from "react";

// IMPORT YOUR CHILD ADMIN COMPONENTS
import HeroImagesAdmin from "./HeroImagesAdmin";
import StatsJokesAdmin from "./StatsJokesAdmin";
import EmbarrassingResultsAdmin from "./EmbarrassingResultsAdmin";
import SigningsAdmin from "./SigningsAdmin";
import DVDClipsAdmin from "./DVDClipsAdmin";

const Admin = () => {
  // We'll use "heroImages" as our default tab
  const [activeTab, setActiveTab] = useState("heroImages");

  return (
    <div className="admin-dashboard" style={{ padding: "1rem" }}>
      <h2>Welcome to the Admin Panel</h2>
      <p>Use the tabs below to manage different data collections.</p>

      {/* TAB BAR */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {/* 1) Hero Images Tab */}
        <button
          onClick={() => setActiveTab("heroImages")}
          style={{
            backgroundColor: activeTab === "heroImages" ? "#ddd" : "#fff",
            padding: "0.5rem",
          }}
        >
          Hero Images
        </button>

        {/* 2) Stats/Jokes Tab */}
        <button
          onClick={() => setActiveTab("statsJokes")}
          style={{
            backgroundColor: activeTab === "statsJokes" ? "#ddd" : "#fff",
            padding: "0.5rem",
          }}
        >
          Stats/Jokes
        </button>

        {/* 3) Embarrassing Results Tab */}
        <button
          onClick={() => setActiveTab("results")}
          style={{
            backgroundColor: activeTab === "results" ? "#ddd" : "#fff",
            padding: "0.5rem",
          }}
        >
          Embarrassing Results
        </button>

        {/* 4) Signings Tab */}
        <button
          onClick={() => setActiveTab("signings")}
          style={{
            backgroundColor: activeTab === "signings" ? "#ddd" : "#fff",
            padding: "0.5rem",
          }}
        >
          Signings
        </button>

        {/* 5) DVD Clips Tab */}
        <button
          onClick={() => setActiveTab("dvd")}
          style={{
            backgroundColor: activeTab === "dvd" ? "#ddd" : "#fff",
            padding: "0.5rem",
          }}
        >
          DVD Clips
        </button>
      </div>

      {/* TAB CONTENT: Show the corresponding component based on activeTab */}
      {activeTab === "heroImages" && <HeroImagesAdmin />}
      {activeTab === "statsJokes" && <StatsJokesAdmin />}
      {activeTab === "results" && <EmbarrassingResultsAdmin />}
      {activeTab === "signings" && <SigningsAdmin />}
      {activeTab === "dvd" && <DVDClipsAdmin />}
    </div>
  );
};

export default Admin;
