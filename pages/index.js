import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components';

// GQL query
const query = gql`
  query matches {
    matches {
      cached
      matches {
        status
        id
        competition {
          name
        }
        homeTeam {
          id
          name
        }
        awayTeam {
          id
          name
        }
        score {
          duration
          fullTime {
            homeTeam
            awayTeam
          }
        }
      }
    }
  }
`;

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
  ) 0% 0% / 100% 100%;

  & + & {
    border-top: 5px solid #000;
    /* margin-top: 30px; */

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
`;

const Home = styled.span`
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

  @media(min-width: 640px) {
    font-size: 2.2em;
  }

  width: 50%;
  color: rgb(33, 33, 33);

  span {
    padding: 0 15px;
  }
`;

const Away = styled.span`
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

  @media(min-width: 640px) {
    font-size: 2.2em;
  }

  width: 50%;
  color: rgb(222, 222, 222);

  span {
    padding: 0 15px;
  }
`;

// exported component
const Index = () => {
  const {
    data, loading, error
  } = useQuery(query)

  if (loading || error) return null;

  const matches = get(data, 'matches.matches', null);

  console.log(matches)

  if (matches) {
    return (
      <>
        {matches.map(match => {
          const homeTeamName= get(match, 'homeTeam.name', '-');
          const homeTeamScore= get(match, 'score.fullTime.homeTeam', '-');
          const awayTeamName = get(match, 'awayTeam.name', '-');
          const awayTeamScore = get(match, 'score.fullTime.awayTeam', '-');

          const labels = {
            IN_PLAY: "In play",
            POSTPONED: "Postponed",
            CANCELED: "Canceled",
            SUSPENDED: "Suspended",
            PAUSED: "Paused",
            FINISHED: "Finished"
          }

          return (
            <Match key={match.id}>
              <Home>
                <div>{homeTeamName}</div> <span>{homeTeamScore !== null ? homeTeamScore : '-'}</span>
              </Home>
              <Away>
                <span>{awayTeamScore !== null ? awayTeamScore : '-'}</span> <div>{awayTeamName}</div>
              </Away>
              <Tags>
                <Pill>{labels[match.status]}</Pill>
                <Pill>{match.competition.name}</Pill>
              </Tags>
            </Match>
          )
        })}
      </>
    )
  }

  return null
}

export default withApollo(Index)
