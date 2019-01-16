import React from 'react';

import OOContext from '../context/OO';

const withTogglePlay = (WrappedComponent) => {
  class WithTogglePlay extends React.PureComponent {
    static contextType = OOContext;

    state = {
      isPlaying: false,
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
      this.togglePlayPause();
    }

    togglePlayPause = () => {
      this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }));
    };

    render() {
      const { isPlaying } = this.state;
      const { togglePlayPause } = this;

      return (
        <WrappedComponent
          {...this.props}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      );
    }
  }
  /* eslint-enable react/no-unused-state */

  return WithTogglePlay;
};

export default withTogglePlay;
