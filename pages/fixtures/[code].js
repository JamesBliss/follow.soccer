import React from 'react';
import styled from 'styled-components';

// config
import { addApolloState, initializeApollo } from '../../lib/apollo';
import { GET_FIXTURES } from '../../lib/queries';

// components
import Page from '~/components/global/Page';
import Day from '~/components/fixtures/Day';

//
export async function getStaticProps(context) {
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

    const notFound = !data?.competitionCurrentMatchday;

    return addApolloState(apolloClient, {
      props: {
        fixtures: data?.competitionCurrentMatchday,
      },
      notFound,
      revalidate: 60, // Every minute
    });
  } catch (error) {
    error.ctx = context;
    console.log(error);
    throw error;
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

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
