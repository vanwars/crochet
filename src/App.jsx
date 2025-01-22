import React, { useState } from "react";
import Header from './components/Header.jsx';
import Stitchbar from './components/stitches/Stitchbar.jsx';
import Chart from './components/chart/Chart.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';
import Stitch from './components/stitches/Stitch.jsx';
import { COLORS } from "./colors.jsx";
import './App.css';

// Import images
import chImage from './images/ch.jpg';
import slstImage from './images/slst.jpg';
import scImage from './images/sc.jpg';
import hdcImage from './images/hdc.jpg';
import dcImage from './images/dc.jpg';
import trImage from './images/tr.jpg';
import { Input } from "antd";

export default function App() {
    const initialStitches = [
        { id: 'ch', name: 'Chain', image: chImage, h: 1, w: 1 },
        { id: 'slst', name: 'Slip Stitch', image: slstImage, h: 0, w: 1 },
        { id: 'sc', name: 'Single Crochet', image: scImage, h: 1, w: 1 },
        { id: 'hdc', name: 'Half Double Crochet', image: hdcImage, h: 2, w: 1 },
        { id: 'dc', name: 'Double Crochet', image: dcImage, h: 3, w: 1 },
        { id: 'tr', name: 'Treble Crochet', image: trImage, h: 4, w: 1 },
    ];

    const [submitted, setSubmitted] = useState(false);
    const [rounds, setRounds] = useState([]);
    const [pendingRound, setPendingRound] = useState(null); // Pending round being worked on
    const [inputValue, setInputValue] = useState('');
    const [selectedStitch, setSelectedStitch] = useState(null);

    const startingSts = (event) => {
        event.preventDefault();
        setSubmitted(true);
     };

    const calculateStitchCount = (roundIndex) => {
        return inputValue + (inputValue * roundIndex);
    };

    const handleSetStitch = (stitch) => {

        setPendingRound((prevRound) => ({
            ...prevRound,
            stitchId: stitch.id,
        }));
    };

    const handleGenerateRound = (stitch) => {

        if (!pendingRound) {
            // Add a new round if there isn't a pending round
            const newRound = {
                stitchCount: calculateStitchCount(rounds.length),
                stitchId: stitch ? stitch.id : null,
            };
            setPendingRound(newRound);
            if (!stitch) {
                alert('New round added. Please select a stitch and click Generate again.');
            }
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
                <div className="Stitchbar">
                    <Stitchbar
                        stitches={initialStitches}
                        onSelect={setSelectedStitch}
                        onGenerateRound={handleGenerateRound}
                        onReset={handleReset}
                    />
                </div>

                {selectedStitch && (
                    <div className="Stitch">
                        <Stitch
                            stitchHeight={`${selectedStitch.h * 10}px`}
                            stitchWidth={`${selectedStitch.w * 10}px`}
                            image={selectedStitch.image}
                            name={selectedStitch.name}
                        />
                    </div>
                )}

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

                        <div className="Chart">
                            <Chart rounds={rounds} stitches={initialStitches} />
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