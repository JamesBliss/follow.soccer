import App from 'next/app'
import Router from 'next/router'

import * as gtag from '../lib/ga';

// imported components
import Page from '../components/page';

// function
Router.events.on('routeChangeComplete', url => gtag.pageview(url))

// exported components
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
        <Page>
          <Component {...pageProps} />
        </Page>
    );
  }
}

export default MyApp;