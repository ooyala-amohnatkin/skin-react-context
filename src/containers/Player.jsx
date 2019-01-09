import React, { PureComponent } from 'react';

import OOContext from '../context';

import ActiveScreen from '../components/ActiveScreen';
import ControlBar from '../components/ControlBar';

class Player extends PureComponent {
  static contextType = OOContext;

  render() {
    const {
      contentTree,
      activeScreen,
      setActiveScreen,
      isPlaying,
      togglePlayPause,
    } = this.context;


    if (!contentTree) {
      return null;
    }
    const style = {
      background: `url(${contentTree.promo_image}) center center no-repeat`,
      backgroundSize: 'contain',
    };

    return (
      <div className="player" style={style}>
        <div className="screen">
          <ActiveScreen
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
          <ControlBar
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
        </div>
      </div>
    );
  }
}


export default Player;
