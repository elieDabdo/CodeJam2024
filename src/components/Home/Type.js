import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Innovating the accessible gaming industry.",
          "Active play, anywhere, anytime.",
          "Gaming made easy.",
          "Step up your game—literally.",
          "Accessible, fun, and full of action.",
          "Healthier breaks, better play.",
          "Your webcam is your new controller.",
          "No equipment, just movement.",
          "Active fun, straight from your browser.",
          "Breaks reimagined, fun amplified.",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
