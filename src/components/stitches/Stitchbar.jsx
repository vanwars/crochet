import React from 'react';
import Button from '../Button';
import './Stitchbar.css';

const Stitchbar = ({ stitches, onSelect, onAddRound, onGenerateRound, onReset }) => {
  return (
    <>
      <div className="creation-buttons">
        <Button onClick={onAddRound}>Add Round</Button>
        <Button onClick={onGenerateRound}>Generate Round</Button>
        <Button onClick={onReset}>Reset</Button>
       </div>
      <div className="stitch-buttons">
        {stitches.map(stitch => (
          <Button key={stitch.id} onClick={() => onSelect(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: '50px', width: '50px' }} />
          </Button>
        ))}
       </div>
    </>
  );
};

export default Stitchbar;