import React, { useState } from "react";
import Header from './components/Header.jsx';
import Stitchbar from './components/stitches/Stitchbar.jsx';
import Chart from './components/chart/Chart.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';
import { COLORS } from "./colors.jsx";

import './App.css';

export default function App() {
     const [submitted, setSubmitted] = useState(false);
     const [inputValue, setInputValue] = useState('');

     const startingSts = (event) => {
        event.preventDefault();
        setSubmitted(true);
     }

     return (
        <>
            <header>
                <Header />
            </header>
            <main style={{background: COLORS.light}}>
                <div className="Stitchbar">
                    <Stitchbar />
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
                    <div className="Chart">
                        <Chart startingStitches={inputValue} />
                    </div>
                )}
                <div className="Toolbar">
                    <Toolbar />
                </div>
            </main>
        </>
    );
}

