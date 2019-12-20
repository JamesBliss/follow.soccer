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
  padding: 4vmin;

  background: linear-gradient(
    120deg,
    rgb(222, 222, 222) 0%,
    rgb(222, 222, 222) 50%,
    rgb(33, 33, 33) 50%,
    rgb(33, 33, 33) 100%
  ) 0% 0% / 100% 100%;

  & + & {
    margin-top: 30px;
  }
`;

const Label = styled.span`
  position: absolute;
  bottom: 5px;
  left: 50%;
  font-size: 0.8em;
  transform: translateX(-50%);
  padding: 5px 15px;
  background: #f2f2f2;
  border-radius: 20px;
`;

const Home = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 1.2em;

  @media(min-width: 640px) {
    font-size: 2.2em;
  }

  width: 50%;
  color: rgb(33, 33, 33);

  span {
    padding-left: 10px;
  }
`;

const Away = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 1.2em;

  @media(min-width: 640px) {
    font-size: 2.2em;
  }

  width: 50%;
  color: rgb(222, 222, 222);

  span {
    padding-right: 10px;
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
              <Label>{labels[match.status]}</Label>
              <Home>
                {homeTeamName} <span>{homeTeamScore}</span>
              </Home>
              <Away>
                <span>{awayTeamScore}</span> {awayTeamName}
              </Away>
            </Match>
          )
        })}
      </>
    )
  }

  return null
}

export default withApollo(Index)
