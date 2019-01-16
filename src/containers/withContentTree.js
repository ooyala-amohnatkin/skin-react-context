import React from 'react';

import OOContext from '../context/OO';

const withContentTree = (WrappedComponent) => {
  class WithContentTree extends React.PureComponent {
    static contextType = OOContext;

    state = {
      contentTree: null,
    };

    componentDidMount() {
      const { mb, OO } = this.context;

      mb.subscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', this.onContentTreeFetched);
    }

    componentWillUnmount() {
      const { mb, OO } = this.context;
      mb.unsubscribe(OO.EVENTS.CONTENT_TREE_FETCHED, 'customerUi', this.onContentTreeFetched);
    }

    onContentTreeFetched = (event, contentTree) => {
      this.setState({ contentTree });
    }

    render() {
      const { contentTree } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          contentTree={contentTree}
        />
      );
    }
  }
  /* eslint-enable react/no-unused-state */

  return WithContentTree;
};

export default withContentTree;
