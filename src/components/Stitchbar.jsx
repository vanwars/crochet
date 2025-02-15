import React, { useState } from "react";
import Button from "./Button.jsx";
import "../css/Stitchbar.css";

const Stitchbar = ({ stitches, onSelect, onGenerateRound }) => {
  const [selectedStitches, setSelectedStitches] = useState([]);
  const [gettingSequence, setGettingSequence] = useState(false);

  const handleSubmit = async () => {
    if (selectedStitches.length === 0) {
      alert("Please select at least one stitch");
      return;
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
      onGenerateRound(); // Trigger the update in App.jsx
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelect = (stitch) => {
    onSelect(stitch);
    setSelectedStitches((prevSelectedStitches) => {
      return [...prevSelectedStitches, stitch];
    });
  };

  const handleNewRound = () => {
    console.log("new round button clicked");
    setGettingSequence(true);
  };

  const handleGenerateRound = () => {
    console.log("generate round button clicked");
    handleSubmit();
    console.log("handled submit");
    setGettingSequence(false);
    setSelectedStitches([]);
  };

  const handleClearSelection = () => {
    console.log("clear selection button clicked");
    setSelectedStitches([]);
  };

  return (
    <>
      <div className="creation-buttons">
        <Button onClick={() => console.log("undo button clicked")}>Undo</Button>
        <Button onClick={() => console.log("redo button clicked")}>Redo</Button>
        <Button onClick={handleClearSelection}>Clear selection</Button>

        {!gettingSequence && <Button onClick={handleNewRound}>Add Round</Button>}

        {gettingSequence && (
          <table>
            <tbody>
              <tr>
                {selectedStitches.map((stitch) => (
                  <td key={stitch.id}>
                    <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
                  </td>
                ))}
              </tr>
              <tr>
                <td>
                  <Button onClick={handleGenerateRound}>Generate Round</Button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className="stitch-buttons">
        {stitches.map((stitch) => (
          <Button key={stitch.id} onClick={() => handleSelect(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: "50px", width: "50px" }} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Stitchbar;
