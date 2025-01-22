import React from 'react';
import Button from '../Button';
import './Stitchbar.css';

const Stitchbar = ({ stitches, onSelect, onGenerateRound, onReset }) => {
  const handleSelect = (stitch) => {
    onSelect(stitch);
    onGenerateRound(stitch);
  };

  return (
    <>
      <div className="creation-buttons">
        <Button onClick={() => onGenerateRound(null)}>Generate Round</Button>
        <Button onClick={onReset}>Reset</Button>
      </div>  

      <div className="stitch-buttons">
        {stitches.map(stitch => (
          <Button key={stitch.id} onClick={() => handleSelect(stitch)}>
            <img src={stitch.image} alt={stitch.name} style={{ height: '50px', width: '50px' }} />
          </Button>
        ))}
      </div>
    </>
  );
};

export default Stitchbar;