const Moment = require('moment');

module.exports = {
  Queries: {},
  Types: {
    Match: {
      time: async (match) => {
        console.log(match)
        const duration = Moment.duration(Moment.utc(match.utcDate).diff(Moment()));

        return {
          fromNow: Moment.utc(match.utcDate).fromNow(),
          hours: duration.get('hours'),
          minutes: duration.get('minutes'),
          days: duration.get('days')
        }
      }
    }
  }
}