import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Innovating the accessible gaming industry.",
          "Bringing you a healthy way to de-stress",
          "Let your anger out",
          "Gaming made easy",
          "Fight without the fuss",
          "Rage out",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
