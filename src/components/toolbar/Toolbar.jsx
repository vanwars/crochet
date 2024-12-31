import React from 'react';
import Button from '../Button';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <div className="toolbar">
        <Button onClick={() => console.log('undo button clicked')}>
           undo
         </Button>
        <Button onClick={() => console.log('redo button clicked')}>
           redo
         </Button>
        <Button onClick={() => console.log('clear all button clicked')}>
           clear
         </Button>
    </div>
  );
};
export default Toolbar;