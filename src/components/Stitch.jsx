import React from "react";

const Stitch = ({ stitchHeight, stitchWidth, image, name }) => {
  return (
    <div className="stitch">
      <img src={image} alt={name} style={{ height: "50px", width: "50px" }} />
      <h3>{name}</h3>
      <p>Height: {stitchHeight}</p>
      <p>Width: {stitchWidth}</p>
    </div>
  );
};

export default Stitch;
