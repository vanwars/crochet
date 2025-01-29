import React from "react";
import Stitch from "./Stitch.jsx";

const Round = ({ round, roundIndex, stitches }) => {
  return (
    <div className="round">
      {stitches.map((stitch) => (
        <div key={stitch.id}>
          <Stitch />
          <img
            src={stitch.image}
            alt={stitch.name}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Round;
