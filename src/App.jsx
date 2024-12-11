import React, { useState, useEffect, Children } from "react";
import Header from './components/Header.jsx';
import Toolbar from './components/Toolbar.jsx';
import Chart from './components/Chart.jsx';

import './App.css';

export default function App() {
            
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                <div className="toolbar">            
                    <Toolbar />
                </div>
                <div className="chart">   
                    <Chart />
                </div>
            </main>
        </>
    );
}

