import { useState } from 'react';
import { GameContainer } from './components/GameContainer';

import { GameIntro } from './components/GameIntro';

function App() {
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [char, setChar] = useState<string>('a');

  const handleGameStart = () => {
    setIsGameStart(true);
  };

  // I use react's special key prop to give a different key than the previous one
  // to reset the game state. When a different key value comes in,
  // the react element is completely recreated and all the states in it are reset as well.
  // this is a little trick.
  const handleGameReset = () => {
    const c = char === 'a' ? 'b' : 'a';
    setChar(c);
  };

  return (
    <>
      {isGameStart ? (
        <GameContainer key={char} resetGame={handleGameReset} />
      ) : (
        <GameIntro onGameStart={handleGameStart} />
      )}
    </>
  );
}

export default App;
