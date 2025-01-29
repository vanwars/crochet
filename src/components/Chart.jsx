import React from "react";
import Round from "./Round.jsx";
import "../css/Chart.css";

const Chart = ({ newRound }) => {
  const [allRounds, setAllRounds] = useState([newRound]);

  useEffect(() => {
    if (newRound) {
      setAllRounds([...allRounds, newRound]);
    }
  }, [newRound]);

  return (
    <div className="chart">
      <ul>
        {rounds.map((round, index) => (
          <Round key={index} round={round} stitches={stitches} />
        ))}
      </ul>
    </div>
  );
};

export default Chart;
