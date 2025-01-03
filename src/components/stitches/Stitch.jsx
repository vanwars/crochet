import React from 'react';

const Stitch = ({ stitch, onSelect, isSelected }) => {
    return (
      <button
        onClick={() => onSelect(stitch.id)}
        style={{
          margin: '10px',
          border: isSelected ? '2px solid green' : '1px solid #ccc',
          borderRadius: '5px',
          background: 'none',
          cursor: 'pointer',
          padding: '5px',
          textAlign: 'center',
        }}
      >
        <img
          src={stitch.image}
          alt={stitch.name}
          style={{ width: '50px', height: '50px' }}
        />
        <p>{stitch.name}</p>
      </button>
    );
  };
  
  export default Stitch;