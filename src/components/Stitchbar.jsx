import React from 'react';
import Button from './Button.jsx';
import '../css/Stitchbar.css';

const Stitchbar = ({ stitches, onSelect, onGenerateRound }) => {

  const handleSelect = (stitch) => {
    onSelect(stitch);
  };

  return (
    <>
      <div className="creation-buttons">
        <Button onClick={() => onGenerateRound(null)}>Generate Round</Button>
        <Button onClick={() => console.log('undo button clicked')}>Undo</Button>
        <Button onClick={() => console.log('redo button clicked')}>Redo </Button>
        <Button onClick={() => console.log('clear all button clicked')}>Clear</Button>
      </div>  

      {/* put a thing here to display selected stitches, add to the handleSelect */}

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