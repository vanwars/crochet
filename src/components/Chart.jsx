import React, { useEffect, useState } from "react";
import "../css/Chart.css";
import Stitch from "./Stitch";

const Chart = ({ stitches, updateChart, rounds }) => {
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

  const outputStitches = (stitches, offset) => {
    let top = 150 + offset;
    let left = 400;
    return stitches.map((stitch) => {
      const inline_styles = {
        position: "absolute",
        top: top,
        left: left,
        width: "50px",
        height: "50px",
      };
      console.log(stitch);
      // top += 35;
      left += 55;
      return <img src={stitch.image} style={inline_styles} alt={stitch.name} />;
    });
  };

  const outputText = (stitches, offset) => {
    let top = 150 + offset;
    let left = 800;
    return stitches.map((stitch) => {
      const inline_styles = {
        position: "absolute",
        top: top,
        left: left,
        width: "50px",
        height: "50px",
      };
      left += 55;
      return (
        <div key={stitch.id} style={inline_styles}>
          {stitch.id}
        </div>
      );
    });
  };

  return (
    <div className="chart">
      {rounds.map((round, idx) => {
        return <div>{outputStitches(round.stitches, idx * 80)}</div>;
      })}
      {rounds.map((round, idx) => {
        return <div>{outputText(round.stitches, idx * 80)}</div>;
      })}
    </div>
  );
};

export default Chart;
