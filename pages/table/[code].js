import React from 'react';
import styled from 'styled-components';

// components
import Page from '~/components/global/Page';
import Table from '~/components/table/Table';

// config
import { addApolloState, initializeApollo } from '~/lib/apollo';
import { GET_TABLE } from '~/lib/queries';

//
export const getServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { code } = context.params;

  try {
    const [{ data }] = await Promise.all([
      apolloClient.query({
        query: GET_TABLE,
        variables: {
          code: code.toUpperCase(),
        },
      }),
    ]);

    const notFound = !data?.competitionStandings.data;

    return addApolloState(apolloClient, {
      props: {
        table: data?.competitionStandings.data,
        errors: data?.competitionStandings.errors,
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

// exported component
const Tables = ({ table }) => {
  const { standings } = table;
  const hasStandings = !!standings;

  return (
    <Page>
      {hasStandings &&
        standings.map((standing, index) => (
          <Wrapper>
            <Table key={index} data={standing.table} />
          </Wrapper>
        ))}
      {!hasStandings && (
        <Container>
          <h1>No active table</h1>
        </Container>
      )}
    </Page>
  );
};

// export
export default Tables;
