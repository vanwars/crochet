import React from "react";
import Stitch from "../stitches/Stitch.jsx";

const Round = ({ round, roundIndex, stitches, onSetStitch }) => {
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        textAlign: 'center',
      }}
    >
      <p>Round {roundIndex + 1}</p>
      <p>Stitch Count: {round.stitchCount}</p>
      {round.stitchId ? (
        <>
          <img
            src={stitches.find((stitch) => stitch.id === round.stitchId)?.image}
            alt="Selected Stitch"
            style={{ width: '50px', height: '50px' }}
          />
          <p>{stitches.find((stitch) => stitch.id === round.stitchId)?.name}</p>
        </>
      ) : (
        <p>No Stitch Selected</p>
      )}
      <div style={{ marginTop: '10px' }}>
        {stitches.map((stitch) => (
          <Stitch
            key={stitch.id}
            stitch={stitch}
            isSelected={round.stitchId === stitch.id}
            onSelect={(stitchId) => onSetStitch(roundIndex, stitchId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Round;
