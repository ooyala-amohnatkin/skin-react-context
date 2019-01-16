import React from 'react';

import { SCREEN } from '../constants/constants';

import OOContext from '../context/OO';

const withActiveScreen = (WrappedComponent) => {
  class WithActiveScreen extends React.PureComponent {
    static contextType = OOContext;

    state = {
      activeScreen: SCREEN.START_SCREEN,
    };

    componentDidMount() {
      const { mb, OO } = this.context;

      mb.subscribe(OO.EVENTS.PLAYED, 'customerUi', this.onPlayed);
    }

    componentWillUnmount() {
      const { mb, OO } = this.context;
      mb.unsubscribe(OO.EVENTS.PLAYED, 'customerUi', this.onPlayed);
    }

    onPlayed = () => {
      this.setActiveScreen(SCREEN.END_SCREEN);
    }

    setActiveScreen = (activeScreen) => {
      this.notifyPlayer(activeScreen);

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

    notifyPlayer(activeScreen) {
      const { mb, OO } = this.context;

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
    }

    render() {
      const { activeScreen } = this.state;
      const { setActiveScreen } = this;

      return (
        <WrappedComponent
          {...this.props}
          activeScreen={activeScreen}
          setActiveScreen={setActiveScreen}
        />
      );
    }
  }

  return WithActiveScreen;
};

export default withActiveScreen;
