import React from 'react';

import { SCREEN } from './constants/constants';

import Player from './containers/Player';
import OOContext from './context';

/* eslint-disable react/no-unused-state */
// App component keeps context and manages subscriptions using Message Bus
class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setActiveScreen = (activeScreen) => {
      const { mb, OO } = this.props;

      switch (activeScreen) {
        case SCREEN.START_SCREEN:
          mb.publish(OO.EVENTS.INITIAL_PLAY, Date.now(), false);
          break;
        case SCREEN.PAUSE_SCREEN:
          mb.publish(OO.EVENTS.PLAY);
          break;
        case SCREEN.PLAYING_SCREEN:
          mb.publish(OO.EVENTS.PAUSE);
          break;
        case SCREEN.END_SCREEN:
          mb.publish(OO.EVENTS.REPLAY);
          break;
        default:
          break;
      }

      const nextScreen = (() => {
        switch (activeScreen) {
          case SCREEN.START_SCREEN:
            return SCREEN.PLAYING_SCREEN;
          case SCREEN.PLAYING_SCREEN:
            return SCREEN.PAUSE_SCREEN;
          case SCREEN.PAUSE_SCREEN:
            return SCREEN.PLAYING_SCREEN;
          case SCREEN.END_SCREEN:
            return SCREEN.PLAYING_SCREEN;
          default:
            return activeScreen;
        }
      })();

      this.setState({ activeScreen: nextScreen });
    };
    this.togglePlayPause = () => {
      const { activeScreen } = this.state;
      const { setActiveScreen } = this;

      setActiveScreen(activeScreen);

      this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));
    };

    this.state = {
      OO: null,
      contentTree: null,
      activeScreen: SCREEN.START_SCREEN,
      setActiveScreen: this.setActiveScreen,
      isPlaying: false,
      togglePlayPause: this.togglePlayPause,
    };
  }

  componentDidMount() {
    const { mb, OO } = this.props;

    this.setState({ OO });

    mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', this.onContentTreeFetched.bind(this));
    mb.subscribe(OO.EVENTS.PLAYED, 'customerUi', this.onPlayed.bind(this));
  }

  componentWillUnmount() {
    const { mb, OO } = this.props;
    mb.unsubscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi');
  }

  onContentTreeFetched(event, contentTree) {
    this.setState({ contentTree });
  }

  onPlayed() {
    this.setActiveScreen(SCREEN.END_SCREEN);
    this.togglePlayPause();
  }


  render() {
    const { OO } = this.state;
    if (!OO) {
      return null;
    }

    return (
      <OOContext.Provider value={this.state}>
        <div className="oo-player-container">
          <div className="innerWrapper oo-player oo-video-player" />
          <Player />
        </div>
      </OOContext.Provider>
    );
  }
}
/* eslint-enable react/no-unused-state */
export default App;
