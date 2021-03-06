const Moment = require('moment');
const cache = require('../cache');
const api = require('../api');
const _ = require('lodash');
const { GraphQLError } = require('graphql/error');

// 1. set resolver cacheControl
// 2. default to liverpool id but override by custom id
// 3. get matches from today until end of month
// 4. build url
// 5. check if fetch is in cache
// 6. return the first match in the matches
module.exports = {
  Queries: {
    nextMatch: async (parent, args, ctx) => {
      const id = args.id || 64;
      const date = Moment(new Date());
      const today = date.format('YYYY-MM-DD');
      const week = date.add(10, 'M').format('YYYY-MM-DD');

      const url = `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${today}&dateTo=${week}`;

      let matches = cache.get(url);
      let match;

      if (matches) {
        match = matches.matches[0];
      } else {
        const matches = await api.get(url);
        match = matches.matches[0];
      }

      if (match) {
        const duration = Moment.duration(Moment.utc(match.utcDate).diff(Moment()));

        return {
          ...match,
          cached: _.get(matches, 'cached', null),
          time: {
            hours: duration.get('hours'),
            minutes: duration.get('minutes'),
            days: duration.get('days')
          }
        }
      }

      throw new GraphQLError(
        'No next match found', null, null, null, null, null,
        {
          code: 404,
          status: 404,
          location: 'nextMatch',
          message: 'No next match found'
        }
      );
    },
    upcomingMatches: async (parent, args, ctx) => {
      const id = args.id || 64;

      const date = Moment(new Date());
      const today = date.format('YYYY-MM-DD');
      const week = date.add(1, 'Y').format('YYYY-MM-DD');

      const url = `https://api.football-data.org/v2/teams/${id}/matches?dateFrom=${today}&dateTo=${week}`;

      let matches = cache.get(url);

      if (!matches) {
        matches = await api.get(url);
      }

      return matches;
    },
    allMatches: async (parent, args, ctx) => {
      const id = args.id || 64;

      const url = `https://api.football-data.org/v2/teams/${id}/matches`;

      let matches = cache.get(url);

      if (!matches) {
        matches = await api.get(url);
      }

      return matches;
    },
    match: async (parent, args, ctx) => {
      const id = args.id || 64;

      const url = `https://api.football-data.org/v2/matches/${id}`;

      let match = cache.get(url);

      if (!match) {
        match = await api.get(url);
      }

      return match;
    },
    matches: async (parent, args, ctx) => {
      const url = `https://api.football-data.org/v2/matches`;

      let match = cache.get(url);

      if (!match) {
        match = await api.get(url);
      }

      return match;
    }
  }
}