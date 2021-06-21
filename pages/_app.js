import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';

// helpers
import { useApollo } from '~/lib/apollo';
import { isBrowser } from '~/lib/helpers';

// components
import GlobalStyles from '~/components/global/Styles';
import Meta from '~/components/global/Meta';

//
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = (path) => {
  NProgress.done();
  if (isBrowser) window.ma.trackEvent('Event', 'navigate', `pageview--${path}`);
  window.scrollTo(0, 0);
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

// export
const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <GlobalStyles />
      <Meta />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
