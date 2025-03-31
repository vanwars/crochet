import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Stitchbar from "./components/Stitchbar.jsx";
import Chart from "./components/Chart.jsx";
import TextDisplay from "./components/TextDisplay.jsx";
import Popup from "./components/Popup.jsx";
import { COLORS } from "./colors.jsx";
import "./App.css";

// Import images
import chImage from "./images/ch.jpg";
import slstImage from "./images/slst.jpg";
import scImage from "./images/sc.jpg";
import hdcImage from "./images/hdc.jpg";
import dcImage from "./images/dc.jpg";
import trImage from "./images/tr.jpg";
import mrImage from "./images/mr.png"; // Import the magic ring image

export default function App() {
  const initialStitches = [
    { id: "ch", name: "Chain", image: chImage, h: 1, w: 1 },
    { id: "slst", name: "Slip Stitch", image: slstImage, h: 0, w: 1 },
    { id: "sc", name: "Single Crochet", image: scImage, h: 1, w: 1 },
    { id: "hdc", name: "Half Double Crochet", image: hdcImage, h: 2, w: 1 },
    { id: "dc", name: "Double Crochet", image: dcImage, h: 3, w: 1 },
    { id: "tr", name: "Treble Crochet", image: trImage, h: 4, w: 1 },
    { id: "mr", name: "Magic Ring", image: mrImage, h: 1, w: 1 }, // Add the magic ring stitch
  ];

  const [submitted, setSubmitted] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [roundCount, setRoundCount] = useState(0); // State to track the number of rounds
  const [inputValue, setInputValue] = useState("");
  const [selectedStitch, setSelectedStitch] = useState(null);
  const [startingSts, setStartingSts] = useState(0);
  const [selectedOption, setSelectedOption] = useState("stitches"); // State to track the selected option
  const [updateChart, setUpdateChart] = useState(false); // State to trigger chart update

  const handleStartingSts = async (event) => {
    event.preventDefault();
    if (selectedOption === "stitches") {
      const numChains = parseInt(inputValue, 10);
      const chainStitches = Array(numChains).fill({ id: "ch", name: "Chain", image: chImage, h: 1, w: 1 });
      setRounds([{ stitches: chainStitches }]);
      await handleSubmit(chainStitches);
      setStartingSts(numChains);
      // } else if (selectedOption === "magicRing") {
      //   const magicRingStitch = [{ id: "mr", name: "Magic Ring", image: mrImage, h: 1, w: 1 }];
      //   setRounds([{ stitches: magicRingStitch }]);
      //   await handleSubmit(magicRingStitch);
    }
    setSubmitted(true);
    setUpdateChart((prev) => !prev); // Trigger chart update
    setRoundCount(1); // Initialize round count to 1
  };

  const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  const handleGenerateRound = () => {
    console.log("handleGenerateRound in App.jsx called");
    setUpdateChart((prev) => !prev); // Trigger chart update
    setRoundCount((prevCount) => prevCount + 1); // Increment round count
  };

  const handleSubmit = async (selectedStitches) => {
    const roundLength = startingSts * (1 + roundCount);
    console.log("roundLength", roundLength);

    if (selectedStitches.length === 0) {
      alert("Please select at least one stitch");
      return;
    }

    if (selectedStitches.length < roundLength) {
      //here's where we repeat the sequence to fill the round
      let temp = selectedStitches;
      while (temp.length < roundLength) {
        temp = [...temp, ...selectedStitches];
      }
      temp = temp.slice(0, roundLength); // make sure temp is exactly roundLength
      selectedStitches = temp;
    }

    console.log("Submitting:", selectedStitches);
    try {
      const response = await fetch("http://127.0.0.1:5000/submit-sequence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stitches: selectedStitches }),
      });

      const result = await response.json();
      console.log("Submitted:", result);
      handleGenerateRound(); // Trigger the update in App.jsx
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main style={{ background: COLORS.light }}>
        <div className="Stitchbar">
          <Stitchbar
            stitches={initialStitches}
            startingSts={startingSts}
            onSelect={setSelectedStitch}
            onGenerateRound={handleGenerateRound}
            handleSubmit={handleSubmit}
            generateRandomKey={generateRandomKey}
          />
        </div>

        {!submitted ? (
          <section className="Setup">
            <Popup stitches={initialStitches} generateRandomKey={generateRandomKey} />
            {/* //TEMPORARYYYY */}
            <div className="Instructions">
              <h2>Instructions r here </h2>
            </div>
            <div className="getStartingSts">
              <form onSubmit={handleStartingSts}>
                <label>Please choose the number of starting stitches or select Magic Ring:</label>
                <div className="input-group">
                  <input
                    type="radio"
                    id="stitches"
                    name="startingOption"
                    value="stitches"
                    checked={selectedOption === "stitches"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <label htmlFor="stitches">Number of starting stitches:</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={selectedOption !== "stitches"}
                    required={selectedOption === "stitches"}
                  />
                  {/* <input
                    type="radio"
                    id="magicRing"
                    name="startingOption"
                    value="magicRing"
                    checked={selectedOption === "magicRing"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <label htmlFor="magicRing">Magic ring</label> */}
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <>
            <div className="Chart">
              <Chart
                stitches={initialStitches}
                updateChart={updateChart}
                rounds={rounds}
                setRounds={setRounds}
                generateRandomKey={generateRandomKey}
              />
            </div>
          </>
        )}
        <div className="TextDisplay">
          <TextDisplay updateChart={updateChart} generateRandomKey={generateRandomKey} rounds={rounds} />
        </div>
      </main>
    </>
  );
}
