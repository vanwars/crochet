import React from 'react';
import './Chart.css';
import Grid from './Grid.jsx'; // Ensure this import statement is correct


const Chart = ({ startingStitches }) => {
    return (
      <div className="chart-body">
        <Grid startingStitches={startingStitches} />
      </div>
    );
  };
  
export default Chart;