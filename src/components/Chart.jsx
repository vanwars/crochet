import React, { useEffect, useState } from "react";
import "../css/Chart.css";
import Stitch from "./Stitch";

const Chart = ({ stitches, updateChart }) => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [updateChart]); // Fetch data whenever updateChart changes

  const outputStitches = (stitches) => {
    return stitches.map((stitch) => {
      console.log(stitch);
      return <img src={stitch.image} className="stitch_img" />;
    });
  };

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
      {/* {rounds.map((round, index) => (
        <p key={index}>{JSON.stringify(round.stitches)}</p>
      ))} */}
      {rounds.map((round) => {
        return <div>{outputStitches(round.stitches)}</div>;
      })}
    </div>
  );
};

export default Chart;
