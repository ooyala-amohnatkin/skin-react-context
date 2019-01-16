import React, { PureComponent } from 'react';
import Icon from './Icon';


const playPauseStateList = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
};

class ControlBar extends PureComponent {
  handleClick = (event) => {
    event.preventDefault();
    const {
      onButtonPress,
    } = this.props;

    onButtonPress();
  };

  render() {
    const { isPlaying } = this.props;
    let text;
    if (isPlaying) {
      text = playPauseStateList.PAUSE;
    } else {
      text = playPauseStateList.PLAY;
    }
    return (
      <div className="control-bar">
        <Icon text={text} onClick={this.handleClick} />
      </div>
    );
  }
}

export default ControlBar;
