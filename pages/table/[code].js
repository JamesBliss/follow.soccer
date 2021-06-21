import React from 'react';
import styled from 'styled-components';

// components
import Page from '~/components/global/Page';
import Table from '~/components/table/Table';

// config
import { addApolloState, initializeApollo } from '~/lib/apollo';
import { GET_TABLE } from '~/lib/queries';

//
export async function getStaticProps(context) {
  const apolloClient = initializeApollo();
  const { code } = context.params;

  try {
    const [{ data }] = await Promise.all([
      apolloClient.query({
        query: GET_TABLE,
        variables: {
          code: code.toUpperCase(),
          filter: 'TOTAL',
        },
      }),
    ]);

    const notFound = !data?.competitionStandings;

    return addApolloState(apolloClient, {
      props: {
        table: data?.competitionStandings,
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
const Tables = ({ table }) => {
  const { standings } = table;

  return (
    <Page>
      <Wrapper>
        {standings.map((standing, index) => (
          <Table key={index} data={standing.table} />
        ))}
      </Wrapper>
    </Page>
  );
};

// export
export default Tables;
