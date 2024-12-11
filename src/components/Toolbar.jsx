import React from 'react';
import Button from './Button';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <div className="toolbar">
        <div className="delete-buttons"> {}
        <Button onClick={() => console.log('clear all button clicked')}>
               Clear chart
         </Button>
        <Button onClick={() => console.log('delete round button clicked')}>
               Delete round
         </Button>
        </div>

        <div className="stitch-buttons"> {}
            <Button onClick={() => console.log('chain stitch button clicked')}>
               ch
             </Button>
            <Button onClick={() => console.log('single crochet button clicked')}>
               sc
             </Button>
            <Button onClick={() => console.log('half-double crochet button clicked')}>
               hdc
             </Button>
             <Button onClick={() => console.log('double crochet button clicked')}>
                dc
             </Button>
            <Button onClick={() => console.log('picot button clicked')}>
               pic
             </Button>
            <Button onClick={() => console.log('slip stitch button clicked')}>
               slst
             </Button>
        </div>

    </div>
  );
};
export default Toolbar;