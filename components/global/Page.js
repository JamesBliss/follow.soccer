import React from 'react';
import Router from 'next/router'
import styled from 'styled-components'

// helpers
import { isBrowser } from '../../lib/helpers';

// components
import GlobalStyles from './Styles';
import Meta from './Meta';
import Navigation from './Navigation'

Router.events.on('routeChangeComplete', (url) => {
  if (isBrowser) window.ma.trackEvent('Event', 'navigate', `pageview--${url}`);
});

const Content = styled.div`
  height: 100vh;

  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
`;

const Main = styled.main`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const Page = ({ children}) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Meta />
      <Content>
        <Main>
          { children }
        </Main>
        <Navigation />
      </Content>
    </React.Fragment>
  );
}

export default Page;
