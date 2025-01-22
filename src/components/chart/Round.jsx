import React from "react";
import Stitch from "../stitches/Stitch.jsx";

const Round = ({ round, roundIndex, stitches, onSetStitch }) => {
  const stitch = stitches.find(s => s.id === round.stitchId);

  return (
    // <div
    //   style={{
    //     margin: '10px',
    //     padding: '10px',
    //     border: '1px solid #ccc',
    //     borderRadius: '5px',
    //     textAlign: 'center',
    //   }}
    // >
    <div className="round">
      <h4>Round {roundIndex + 1}</h4>
      <p>Stitch Count: {round.stitchCount}</p>
      <p>Stitch: {stitch ? stitch.name : 'None'}</p>

      {stitches.map(stitch => (
              <div key={stitch.id}>
                <Stitch />
                <img src={stitch.image} alt={stitch.name} style={{ height: '50px', width: '50px' }} />
              </div>
            ))}
      
    </div>
  );
};

export default Round;
