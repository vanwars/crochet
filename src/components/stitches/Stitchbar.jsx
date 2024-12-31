import React from 'react';
import Button from '../Button';
import './Stitchbar.css';

const Stitchbar = () => {
  return (
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
  );
};
export default Stitchbar;