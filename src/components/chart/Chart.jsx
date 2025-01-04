import React from 'react';
import './Chart.css';
// import Grid from './Grid.jsx'; // Ensure this import statement is correct


const Chart = ({ rounds, stitches, onReset }) => {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Chart go here</h2>
      {rounds.map((round, index) => {
        const selectedStitch = stitches.find((stitch) => stitch.id === round.stitchId);
        return (
          <div
            key={index}>
            <h4>Round {index + 1}</h4>
            <p>Stitch Count: {round.stitchCount}</p>
            {selectedStitch ? (
              <>
                <img
                  src={selectedStitch.image}
                  alt={selectedStitch.name}
                  style={{ width: '50px', height: '50px' }}
                />
              </>
            ) : (
              <p>No Stitch Selected</p>
            )}
          </div>
        );
      })}
      <div style={{ marginTop: '20px' }}>
        <button onClick={onReset}>
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Chart;