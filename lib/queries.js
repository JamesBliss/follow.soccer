import gql from 'graphql-tag';

export const GET_NEXT_MATCH = gql`
  query nextMatch($id: Int!) {
    nextMatch(id: $id) {
      id
      cached
      status
      time {
        days
        hours
        minutes
      }
      score {
        winner
      }
      homeTeam {
        name
        id
      }
      awayTeam {
        name
        id
      }
    }
  }
`;

export const GET_TABLE = gql`
  query competitionStandings($id: Int, $code: String, $filter: String) {
    competitionStandings(id: $id, code: $code, filter: $filter) {
      standings {
        type
        group
        table {
          position
          playedGames
          lost
          draw
          won
          points
          goalsFor
          goalsAgainst
          goalDifference
          team {
            name
            crestUrl
          }
        }
      }
    }
  }
`;

export const GET_FIXTURES = gql`
  query competitionCurrentMatchday($id: Int, $code: String) {
    competitionCurrentMatchday(id: $id, code: $code) {
      cached
      days {
        utcDate
        displayDate
        groupedMatches {
          utcDate
          displayDate
          displayDateFull
          until
          matches {
            time {
              days
              hours
              minutes
            }
            homeTeam {
              id
              name
              crestUrl
              tla
              shortName
            }
            awayTeam {
              id
              name
              crestUrl
              tla
              shortName
            }
            score {
              winner
              fullTime {
                homeTeam
                awayTeam
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_TEAM = gql`
  query team($id: Int!) {
    team(id: $id) {
      name
      crestUrl
      tla
      shortName
    }
  }
`;

export const GET_MATCHES = gql`
  query matches {
    matches {
      cached
      matches {
        status
        id
        competition {
          name
        }
        utcDate
        time {
          days
          hours
          minutes
          fromNow
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
