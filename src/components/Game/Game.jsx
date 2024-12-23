import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Playback from "../Playback";
import Navbar from "../Navbar";
import ScrollToTop from "../ScrollToTop";
import "./Game.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const [showNavbar, setShowNavbar] = useState(false); // Initially hidden
  const [lastScrollY, setLastScrollY] = useState(0);
  const reactLocation = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const controlNavbar = () => {
    if (window.scrollY === 0) {
      setShowNavbar(false); // Hide navbar at the top of the page
    } else {
      setShowNavbar(true); // Show navbar when scrolling down or up
    }
    setLastScrollY(window.scrollY); // Update the last scroll position
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const video = reactLocation.state?.video;

  return (
    <div className="game-container">
      {showNavbar && <Navbar />} {/* Conditional rendering */}
      <ScrollToTop />
      <section className="game-section">
        <Playback
          video_url={video}
          user_params={{ training_video_maximized: true }}
        />
      </section>
      {/* Back button */}
      <button
        className="back-button"
        onClick={() => navigate("/")} // Navigate back to home
      >
        Back to Home
      </button>
    </div>
  );
};

export default Game;
