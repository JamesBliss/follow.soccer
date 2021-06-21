import { ApolloProvider } from '@apollo/client';

import Page from '../components/global/Page';

import { useApollo } from '../lib/apollo';

// export
const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default MyApp;