import React from 'react';

import Player from './Player';
import OOContext from './context/OO';

/* eslint-disable react/no-unused-state */
// App component keeps context and manages subscriptions using Message Bus
class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      OO: null,
      mb: null,
    };
  }

  componentDidMount() {
    const { mb, OO } = this.props;

    this.setState({ OO, mb });
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
