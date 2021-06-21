import Head from 'next/head';

const Meta = () => (
  <Head>
    <title>What are football scores?</title>
    <meta name="description" content='Find out what is going on next in football' />
    <meta property='og:site_name' content='follow.soccer' />
    <meta property='description' content='Just see the scores for today!' />
    <meta property='twitter:site' content='@thejamesbliss' />
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:title' content='follow.soccer?' />
    <meta property='og:description' content='Just see the scores for today!' />
    <meta property='og:title' content='follow.soccer?' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://follow.soccer' />

    {/* Fix the below */}
    <meta property='twitter:card' content='summary_large_image' />
    <meta property='twitter:image' content='https://res.cloudinary.com/jamesbliss/image/upload/v1550847183/areliverpoolwinning/sharing/twitter.png' />
    <meta property='og:image' content='https://res.cloudinary.com/jamesbliss/image/upload/v1550847183/areliverpoolwinning/sharing/facebook.png' />
    <link rel="shortcut icon" href="https://res.cloudinary.com/jamesbliss/image/upload/v1547821777/areliverpoolwinning/logo/favicon.ico"></link>
    <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/jamesbliss/image/upload/v1547822257/areliverpoolwinning/logo/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/jamesbliss/image/upload/v1547822257/areliverpoolwinning/logo/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/jamesbliss/image/upload/v1547822257/areliverpoolwinning/logo/favicon-16x16.png" />
  </Head>
);

export default Meta;
