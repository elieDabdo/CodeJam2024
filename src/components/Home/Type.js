import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Innovating the fitness industry",
          "Bringing you a healthier lifestyle",
          "Yoga",
          "Tai Chi",
          "Stretching",
          "Dancing",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
