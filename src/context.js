import React from 'react';

const OOContext = React.createContext({
  OO: null,
  contentTree: null,
  activeScreen: null,
  setActiveScreen: () => {},
  isPlaying: false,
  togglePlayPause: () => {},
});

export default OOContext;
