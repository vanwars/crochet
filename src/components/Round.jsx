import React, { useEffect, useRef } from "react";
import Stitch from "./Stitch";

// const outputText = (stitches, offset) => {
//   let top = 150 + offset;
//   let left = 800;
//   return stitches.map((stitch) => {
//     const inline_styles = {
//       position: "absolute",
//       top: top,
//       left: left,
//       width: "50px",
//       height: "50px",
//     };
//     left += 55;
//     return (
//       <div key={generateRandomKey()} style={inline_styles}>
//         {stitch.id}
//       </div>
//     );
//   });
// };
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const arrangeInCircle = (elements, radius) => {
  const count = elements.length;
  elements.forEach((el, i) => {
    const angle = (i / count) * 2 * Math.PI - Math.PI / 2; // Distribute evenly in a circle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    el.style.position = "absolute";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Calculate the rotation angle to face the center
    const rotationAngle = (angle * 180) / Math.PI + 90; // Convert to degrees and adjust
    el.style.transform = `rotate(${rotationAngle}deg)`;
  });
};
const Round = ({ round, roundIndex, generateRandomKey }) => {
  const roundRef = useRef(null);

  useEffect(() => {
    if (roundRef.current) {
      const elements = roundRef.current.querySelectorAll(".stitch");
      const radius = 50 + roundIndex * 60; // Increase radius for each round
      arrangeInCircle(elements, radius); // Center at (300, 300)
    }
  }, [roundIndex]);

  return (
    <div className="round" ref={roundRef}>
      {round.stitches.map((stitch) => (
        <div key={generateRandomKey()} className="stitch">
          <Stitch />
          <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
        </div>
      ))}
    </div>
  );
};

export default Round;
