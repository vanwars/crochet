import React, { useState } from "react";
import Header from './components/Header.jsx';
import Stitchbar from './components/stitches/Stitchbar.jsx';
import Round from './components/chart/Round.jsx';
import Chart from './components/chart/Chart.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';
import { COLORS } from "./colors.jsx";

import './App.css';

export default function App() {
    const initialStitches = [
        { id: 'ch', name: 'Chain', type: 'basic', image: "o", h: 1, w: 1 },
        { id: 'sc', name: 'Single Crochet', type: 'basic', image: "+", h: 1, w: 1 },
        { id: 'hdc', name: 'Half Double Crochet', type: 'basic', image: "T", h: 2, w: 1 },
        { id: 'dc', name: 'Double Crochet', type: 'basic', image: 'dc', h: 3, w: 1 },
    ];

    const [submitted, setSubmitted] = useState(false);
    const [rounds, setRounds] = useState([]);
    const [pendingRound, setPendingRound] = useState(null); // Pending round being worked on
    const [inputValue, setInputValue] = useState('');

    const startingSts = (event) => {
        event.preventDefault();
        setSubmitted(true);
     };

    const calculateStitchCount = (roundIndex) => {
        const initialStitchCount = 6; // Fixed starting count
        const increaseRate = 6; // Fixed increase rate
        return initialStitchCount + increaseRate * roundIndex;
    };

    const handleAddRound = () => {
        if (pendingRound) {
            alert('Finish the current round before adding a new one!');
            return;
        }

        const roundIndex = rounds.length;
        const newRound = {
            stitchId: null, // No stitch selected yet
            stitchCount: calculateStitchCount(roundIndex),
        };
        setPendingRound(newRound); // Set the new round as pending
    };

    const handleSetStitch = (stitch) => {
        if (!pendingRound) {
            alert('Add a new round before selecting a stitch!');
            return;
        }

        setPendingRound((prevRound) => ({
            ...prevRound,
            stitchId: stitch.id,
        }));
    };

    const handleGenerateRound = () => {
        if (!pendingRound) {
            alert('No pending round to generate!');
            return;
        }

        if (!pendingRound.stitchId) {
            alert('Select a stitch before generating the round!');
            return;
        }

        setRounds((prevRounds) => [...prevRounds, pendingRound]); // Add pending round to main rounds
        setPendingRound(null); // Clear the pending round
    };

    const handleReset = () => {
        setRounds([]);
        setPendingRound(null);
    };

    return (
        <>
            <header>
                <Header />
            </header>
            <main style={{ background: COLORS.light }}>
                {/* Stitchbar now includes the Add Round button */}
                <div className="Stitchbar">
                    <Stitchbar
                        stitches={initialStitches}
                        onStitchSelect={handleSetStitch}
                        onAddRound={handleAddRound} // Pass handleAddRound to Stitchbar
                    />
                </div>

                <div className="controls" style={{ marginBottom: '20px' }}>
                    <button onClick={handleGenerateRound}>
                        Generate
                     </button>
                    <button onClick={handleReset} >
                        Reset
                     </button>
                </div>

                {!submitted ? (
                    <div className="getStartingSts">
                        <form onSubmit={startingSts}>
                            <label>
                                Please choose the number of starting stitches:
                             </label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    required
                                />
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {rounds.map((round, index) => (
                                <Round
                                    key={index}
                                    round={round}
                                    roundIndex={index}
                                    stitches={initialStitches}
                                />
                            ))}
                        </div>

                        {pendingRound && (
                            <div>
                                <h3>Pending Round</h3>
                                <p>Stitch Count: {pendingRound.stitchCount}</p>
                                <p>
                                    Selected Stitch:{' '}
                                    {pendingRound.stitchId
                                        ? initialStitches.find((s) => s.id === pendingRound.stitchId)?.name
                                        : 'None'}
                                </p>
                            </div>
                        )}

                        <div className="Chart">
                            <Chart rounds={rounds} stitches={initialStitches} onReset={handleReset} />
                        </div>

                        <div className="Toolbar">
                            <Toolbar />
                        </div>
                    </>
                )}
            </main> //end of main (obv)
        </> //end of div under return
    ); //end of return

} //end of App function