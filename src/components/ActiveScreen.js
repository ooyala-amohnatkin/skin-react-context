import React from 'react';

import { SCREEN } from '../constants/constants';

import StartScreen from './Screens/StartScreen';
import PlayScreen from './Screens/PlayScreen';
import PauseScreen from './Screens/PauseScreen';
import EndScreen from './Screens/EndScreen';

const ActiveScreen = ({ activeScreen }) => {
  switch (activeScreen) {
    case SCREEN.START_SCREEN:
      return <StartScreen />;
    case SCREEN.PLAYING_SCREEN:
      return <PlayScreen />;
    case SCREEN.PAUSE_SCREEN:
      return <PauseScreen />;
    case SCREEN.END_SCREEN:
      return <EndScreen />;
    default:
      return null;
  }
};

export default ActiveScreen;
