import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export default (OO/* , _, $, W */) => {
  class Html5Skin {
    constructor(mb, id) {
      this.mb = mb;
      this.id = id;
      this.init();
    }

    init() {
      const { mb } = this;

      if (!mb) {
        return;
      }
      mb.subscribe(OO.EVENTS.PLAYER_CREATED, 'customerUi', (event, elementId, params, settings) => {
        console.group('onPlayerCreated');
        console.log(`elementId: ${elementId}`);
        console.log('params: ');
        console.log(params);
        console.log('settings: ');
        console.log(settings);
        console.groupEnd('onPlayerCreated');

        if (!elementId) {
          return;
        }

        const Root = (
          <App mb={mb} OO={OO} />
        );
        ReactDOM.render(Root, document.getElementById(elementId));
      });
    }
  }
  return Html5Skin;
};
