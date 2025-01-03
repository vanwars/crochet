import React from 'react';
import './Stitchbar.css';

const Stitchbar = ({ stitches, onStitchSelect }) => {
  return (
      <div className="stitch-buttons">
        {stitches.map((stitch) => (
          <button
            key={stitch.id}
            onClick={() => onStitchSelect(stitch)}
            style={{
              margin: '5px',
              padding: '10px',
              border: '1px solid #ccc',
              backgroundColor: '#f0f0f0',
              cursor: 'pointer',
            }}
          >
            {stitch.name} ({stitch.image})
          </button>
        ))}
      </div>
  );
};

export default Stitchbar;