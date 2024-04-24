import React, { useEffect, useState } from "react";

const GameStats = (props) => {
  const [time, setTime] = useState();

  useEffect(() => {
    switch (props.timeLeft) {
      case 7:
        setTime("Holy Cow! You solved it with 7 seconds left!");
        break;
      case 6:
        setTime("Impressive! You solved it with 6 seconds left!");
        break;
      case 5:
        setTime("Great! You solved it with 5 seconds left!");
        break;
      case 4:
        setTime("Good One! You solved it with 4 seconds left!");
        break;
      case 3:
        setTime("Not bad! You solved it with 3 seconds left!");
        break;
      case 2:
        setTime("Phew, You solved it with 2 seconds left!");
        break;
      case 1:
        setTime("That was a close one! You solved it with 1 second left!");
        break;
      case 0:
        setTime("Darn! This was a tough one. Try again tomorrow!");
        break;
    }
  }, []);

  return <div>{time}</div>;
};

export default GameStats;
