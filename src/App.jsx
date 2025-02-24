import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Stitchbar from "./components/Stitchbar.jsx";
import Chart from "./components/Chart.jsx";
import Toolbar from "./components/Toolbar.jsx";
import Stitch from "./components/Stitch.jsx";
import { COLORS } from "./colors.jsx";
import "./App.css";

// Import images
import chImage from "./images/ch.jpg";
import slstImage from "./images/slst.jpg";
import scImage from "./images/sc.jpg";
import hdcImage from "./images/hdc.jpg";
import dcImage from "./images/dc.jpg";
import trImage from "./images/tr.jpg";

export default function App() {
  const initialStitches = [
    { id: "ch", name: "Chain", image: chImage, h: 1, w: 1 },
    { id: "slst", name: "Slip Stitch", image: slstImage, h: 0, w: 1 },
    { id: "sc", name: "Single Crochet", image: scImage, h: 1, w: 1 },
    { id: "hdc", name: "Half Double Crochet", image: hdcImage, h: 2, w: 1 },
    { id: "dc", name: "Double Crochet", image: dcImage, h: 3, w: 1 },
    { id: "tr", name: "Treble Crochet", image: trImage, h: 4, w: 1 },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [pendingRound, setPendingRound] = useState(null); // Pending round being worked on
  const [inputValue, setInputValue] = useState("");
  const [selectedStitch, setSelectedStitch] = useState(null);
  const [startingSts, setStartingSts] = useState(0);
  const [updateChart, setUpdateChart] = useState(false); // State to trigger chart update

  const handleStartingSts = (event) => {
    event.preventDefault();
    const numChains = parseInt(inputValue, 10);
    const chainStitches = Array(numChains).fill({ id: "ch", name: "Chain", image: chImage, h: 1, w: 1 });
    setRounds([{ stitches: chainStitches }]);
    setStartingSts(numChains);
    setSubmitted(true);
    setUpdateChart((prev) => !prev); // Trigger chart update
  };

  const handleGenerateRound = () => {
    console.log("handleGenerateRound in App.jsx called");
    setUpdateChart((prev) => !prev); // Trigger chart update
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ background: COLORS.light }}>
        <div className="Stitchbar">
          <Stitchbar stitches={initialStitches} onSelect={setSelectedStitch} onGenerateRound={handleGenerateRound} />
        </div>

        {!submitted ? (
          <div className="getStartingSts">
            <form onSubmit={handleStartingSts}>
              <label>Please choose the number of starting stitches:</label>
              <div className="input-group">
                <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} required />
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="Chart">
              <Chart stitches={initialStitches} updateChart={updateChart} rounds={rounds} />
            </div>

            <div className="Toolbar">
              <Toolbar />
            </div>
          </>
        )}
      </main>
    </>
  );
}
