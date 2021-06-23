import styled from 'styled-components';
import get from 'lodash/get';

// config
import { addApolloState, initializeApollo } from '../../lib/apollo';
import { GET_COMPETITION_MATCHES } from '../../lib/queries';
import { comps } from '~/lib/config';

// components
import Page from '~/components/global/Page';

//
export const getServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  const { code } = context.params;

  const { id } = comps.find((com) => com.code === code.toUpperCase());

  if (!id) {
    const error = {
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

  try {
    const [{ data }] = await Promise.all([
      apolloClient.query({
        query: GET_COMPETITION_MATCHES,
        variables: {
          id,
        },
      }),
    ]);

    const notFound = !data?.nextMatchesByCompetition.data;

    return addApolloState(apolloClient, {
      props: {
        matches: data?.nextMatchesByCompetition?.data?.matches,
        errors: data?.nextMatchesByCompetition?.errors,
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

// styled components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const Match = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 2vmin 4vmin;

  background: linear-gradient(
      120deg,
      rgb(222, 222, 222) 0%,
      rgb(222, 222, 222) 50%,
      rgb(51, 51, 51) 50%,
      rgb(51, 51, 51) 100%
    )
    0% 0% / 100% 100%;

  & + & {
    border-top: 5px solid #000;
  }
`;

const Tags = styled.span`
  position: absolute;
  bottom: 15px;
  left: 50%;
  font-size: 0.8em;
  transform: translateX(-50%);
`;

const Pill = styled.span`
  font-size: 0.8em;
  padding: 5px 15px;
  background: #f2f2f2;
  border-radius: 20px;
  margin: 0 5px;
  white-space: nowrap;
  text-transform: capitalize;
`;

const Team = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 0;
  font-size: 1.2em;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    padding: 0 15px;
  }

  @media (min-width: 640px) {
    font-size: 2.2em;
  }

  width: 50%;
  color: ${({ colour }) => colour};
`;

// exported component
const Live = ({ matches }) => (
  <Page>
    {matches.length !== 0 &&
      matches.map((match) => {
        const homeTeamName = get(match, 'homeTeam.name', '-');
        const homeTeamScore = get(match, 'score.fullTime.homeTeam', '-');
        const awayTeamName = get(match, 'awayTeam.name', '-');
        const awayTeamScore = get(match, 'score.fullTime.awayTeam', '-');

        const { fromNow } = get(match, 'time');

        const labels = {
          IN_PLAY: 'In play',
          POSTPONED: 'Postponed',
          CANCELED: 'Canceled',
          SUSPENDED: 'Suspended',
          PAUSED: 'Paused',
          FINISHED: 'Finished',
        };

        return (
          <Match key={match.id}>
            <Team colour="rgb(51, 51, 51)">
              <div>{homeTeamName}</div> <span>{homeTeamScore !== null ? homeTeamScore : '-'}</span>
            </Team>
            <Team colour="rgb(222, 222, 222)">
              <span>{awayTeamScore !== null ? awayTeamScore : '-'}</span> <div>{awayTeamName}</div>
            </Team>
            <Tags>
              {labels[match.status] && <Pill>{labels[match.status]}</Pill>}
              {!labels[match.status] && <Pill>{fromNow}</Pill>}
              <Pill>{match.competition.name}</Pill>
            </Tags>
          </Match>
        );
      })}
    {matches.length === 0 && (
      <Wrapper>
        <h1>No matches today</h1>
      </Wrapper>
    )}
  </Page>
);

export default Live;
