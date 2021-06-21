import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import get from 'lodash/get';

// config
import { addApolloState, initializeApollo } from '../lib/apollo';
import { GET_MATCHES } from '../lib/queries';

//
export async function getStaticProps(context, ...rest) {
  const apolloClient = initializeApollo();

  try {
    const [{ data }] = await Promise.all([
      apolloClient.query({
        query: GET_MATCHES,
      }),
    ]);

    const notFound = !data?.matches;

    return addApolloState(apolloClient, {
      props: {
        matches: data?.matches,
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

// styled components
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
const Index = () => {
  const { data, loading, error } = useQuery(GET_MATCHES);

  if (loading || error) return null;

  const matches = get(data, 'matches.matches', null);

  console.log({ matches });

  if (matches) {
    // matches.slice().matches.sort(function (a, b) {
    //   return new Date(b.utcDate) - new Date(a.utcDate);
    // });

    return (
      <>
        {matches.map((match) => {
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
      </>
    );
  }

  return null;
};

export default Index;
