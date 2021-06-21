import React from 'react';

import styled from 'styled-components';

// components
import Navigation from './Navigation';

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

const Page = ({ children }) => (
  <>
    <Content>
      <Main>{children}</Main>
      <Navigation />
    </Content>
  </>
);

export default Page;
