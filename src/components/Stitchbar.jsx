import React, { useState } from "react";
import Button from "./Button.jsx";
import "../css/Stitchbar.css";

const Stitchbar = ({ stitches, onSelect, onGenerateRound }) => {
  const [selectedStitches, setSelectedStitches] = useState([]);
  const [gettingSequence, setGettingSequence] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedStitches.length === 0) {
      alert("Please select at least one stitch");
      return;
    }

    try {
      const response = await fetch("/submit-sequence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stitches: selectedStitches }),
      });

      const result = await response.json();
      console.log("Submitted:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelect = (stitch) => {
    onSelect(stitch);
    setSelectedStitches((prevSelectedStitches) => {
      if (prevSelectedStitches.includes(stitch)) {
        return prevSelectedStitches.filter((s) => s !== stitch);
      } else {
        return [...prevSelectedStitches, stitch];
      }
    });
  };

  const handleNewRound = () => {
    console.log("new round button clicked");
    setGettingSequence(true);
  };

  const handleGenerateRound = () => {
    console.log("generate round button clicked");
    handleSubmit();
    setGettingSequence(false);
    setSelectedStitches([]);
  };

  return (
    <>
      <div className="creation-buttons">
        <Button onClick={() => console.log("undo button clicked")}>Undo</Button>
        <Button onClick={() => console.log("redo button clicked")}>Redo</Button>
        <Button onClick={() => console.log("clear all button clicked")}>
          Clear
        </Button>

        {!gettingSequence && (
          <Button onClick={handleNewRound}>Add Round</Button>
        )}

        {gettingSequence && (
          <table>
            <tbody>
              <tr>
                {selectedStitches.map((stitch) => (
                  <td key={stitch.id}>
                    <img
                      src={stitch.image}
                      alt={stitch.name}
                      style={{ height: "50px", width: "50px" }}
                    />
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
            <img
              src={stitch.image}
              alt={stitch.name}
              style={{ height: "50px", width: "50px" }}
            />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Stitchbar;
