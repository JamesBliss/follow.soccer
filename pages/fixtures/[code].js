import React from 'react';
import styled from 'styled-components';

// config
import { addApolloState, initializeApollo } from '../../lib/apollo';
import { GET_FIXTURES } from '../../lib/queries';

// components
import Page from '~/components/global/Page';
import Day from '~/components/fixtures/Day';

//
export const getServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { code } = context.params;

  try {
    const [{ data }] = await Promise.all([
      apolloClient.query({
        query: GET_FIXTURES,
        variables: {
          code: code.toUpperCase(),
        },
      }),
    ]);

    const notFound = !data?.competitionCurrentMatchday.data;

    return addApolloState(apolloClient, {
      props: {
        fixtures: data?.competitionCurrentMatchday.data,
      },
      notFound,
    });
  } catch (error) {
    error.ctx = {
      query: context.query,
      resolvedUrl: context.resolvedUrl,
      params: context.params,
      locales: context.locales,
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    };

    console.log(error);

    return {
      notFound: true,
    };
  }
};

// styled
export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

// exported component
const Fixtures = ({ fixtures }) => {
  const { days } = fixtures;

  console.log(fixtures);

  return (
    <Page>
      <Wrapper>
        {days.map((day) => (
          <Day key={day.utcDate} data={day} />
        ))}
      </Wrapper>
    </Page>
  );
};

// export
export default Fixtures;
