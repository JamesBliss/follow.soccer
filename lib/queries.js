import gql from 'graphql-tag';

export const GET_TABLE = gql`
  query competitionStandings($id: Int, $code: String) {
    competitionStandings(id: $id, code: $code) {
      errors {
        call
        message
        errorCode
      }
      data {
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
  }
`;

export const GET_FIXTURES = gql`
  query competitionCurrentMatchday($id: Int, $code: String) {
    competitionCurrentMatchday(id: $id, code: $code) {
      errors {
        call
        message
        errorCode
      }
      data {
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
  }
`;

export const GET_COMPETITION_MATCHES = gql`
  query nextMatchesByCompetition($id: Int, $code: String) {
    nextMatchesByCompetition(id: $id, code: $code) {
      errors {
        call
        message
        errorCode
      }
      data {
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
  }
`;
