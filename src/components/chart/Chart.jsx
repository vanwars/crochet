import React from 'react';
import Round from './Round';
import './Chart.css';

const Chart = ({ rounds, stitches }) => {
  return (
    <div className="chart">
      {rounds.map((round, index) => (
        <Round key={index} round={round} roundIndex={index} stitches={stitches} />
      ))}
    </div>
  );
};

export default Chart;