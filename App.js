import React from 'react';
import RouterComponent from './app/routes/RouterComponent';
import { GameProvider } from './app/context/GameContext';

const App = () => {
  return (
    <GameProvider>
      <RouterComponent />
    </GameProvider>
  );
};

export default App;
