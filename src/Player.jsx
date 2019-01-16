import React, { PureComponent } from 'react';
import { pipe } from 'ramda';

import OOContext from './context/OO';

import withTogglePlay from './containers/withTogglePlay';
import withActiveScreen from './containers/withActiveScreen';
import withContentTree from './containers/withContentTree';

import ActiveScreen from './components/ActiveScreen';
import ControlBar from './components/ControlBar';

class Player extends PureComponent {
  static contextType = OOContext;

  handleControlButtonPress = () => {
    const {
      togglePlayPause,
      activeScreen,
      setActiveScreen,
    } = this.props;

    togglePlayPause();
    setActiveScreen(activeScreen);
  }

  render() {
    const {
      contentTree,
      isPlaying,
      activeScreen,
    } = this.props;


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
          />
          <ControlBar
            isPlaying={isPlaying}
            onButtonPress={this.handleControlButtonPress}
          />
        </div>
      </div>
    );
  }
}


export default pipe(
  withContentTree,
  withActiveScreen,
  withTogglePlay,
)(Player);
