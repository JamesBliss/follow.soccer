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

  if (matches) {
    return (
      <>
        {matches.map(match => {
          return (
            <Match key={match.id}>
              {/* <p>status: {match.status}</p> */}
              <Home>
                {match.homeTeam.name} <span>{match.score.fullTime.homeTeam || '-'}</span>
              </Home>
              <Away>
                <span>{match.score.fullTime.awayTeam || '-'}</span> {match.awayTeam.name}
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
