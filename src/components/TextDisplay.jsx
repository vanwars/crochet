import React, { useEffect, useState } from "react";
import "../css/TextDisplay.css";

const TextDisplay = ({ stitches, updateChart, rounds, setRounds, generateRandomKey }) => {
  useEffect(() => {
    fetchChartData();
  }, [updateChart]); // Fetch data whenever updateChart changes

  const fetchChartData = async () => {
    console.log("fetchChartData called");
    try {
      const response = await fetch("http://127.0.0.1:5000/get-chart-data");
      const data = await response.json();
      console.log("chart fetched", data);
      setRounds(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  return (
    <div className="text">
      {rounds.map((round, idx) => (
        <div key={generateRandomKey()} className="round-text">
          <b>Round {idx + 1}: </b> {round.stitches.map((stitch) => stitch.id).join(", ")}
        </div>
      ))}
    </div>
  );
};

export default TextDisplay;
