import React, { useEffect, useState } from "react";
import "../css/Chart.css";

const Chart = ({ stitches, updateChart }) => {
  const [rounds, setRounds] = useState([]);

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
    <div className="chart">
      {rounds.map((round, index) => (
        <p key={index}>{JSON.stringify(round)}</p>
      ))}
    </div>
  );
};

export default Chart;
