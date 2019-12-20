import React from 'react';

// components
import GlobalStyles from './globalStyles';

// exported component
class Page extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        { this.props.children }
      </React.Fragment>
    );
  }
}

export default Page;
