const fetch = require('node-fetch').default
const { GraphQLError } = require('graphql/error');
const cache = require('./cache');
var Color = require('color');

const { calculateRatio } = require('./helpers');

//
const KEY = process.env.FOOTBALL_KEY;

const commonColorsWithContrast = ({ palette }) => {
  // Sort by most common
  const commonColours = palette.sort((a, b) => a.count < b.count)

  // Add the text contrast
  return commonColours.map((color) => {
    let textContrast = '#333333'

    const output = calculateRatio({ r: 51, g: 51, b: 51 }, { r: color.rgb[0], g: color.rgb[1], b: color.rgb[2] });

    if (output < 5) {
      textContrast = '#ffffff';
    }

    return {
      ...color,
      hex: new Color(color.rgb).hex(),
      textContrast
    }
  }).filter(colour => {
    return !(colour.rgb[0] > 240 && colour.rgb[1] > 240 && colour.rgb[2] > 240);
  });
};

module.exports = {
  get: async (url) => {
    const res = await fetch(url, { headers: { "X-Auth-Token": KEY } });
    const data = await res.json();

    if (data.errorCode) {
      throw new GraphQLError(
        {
          status: data.errorCode,
          text: data.message
        }
      );
    }
    cache.set(url, { ...data, ...{ cached: new Date() } });

    return data;
  },
  getTeam: async (url) => {
    const res = await fetch(url, { headers: { "X-Auth-Token": KEY } });
    const data = await res.json();

    if (data.errorCode) {
      throw new GraphQLError(
        {
          status: data.errorCode,
          text: data.message
        }
      );
    }

    const team = { ...data };
    cache.set(url, { ...team, ...{ cached: new Date() } });

    return team;
  },
  getTeamsData: async (url) => {
    const res = await fetch(url, { headers: { "X-Auth-Token": KEY } });
    const data = await res.json();

    const mergedData = {
      ...data,
      teams: {
        ...data.teams
      }
    }

    if (data.errorCode) {
      throw new GraphQLError(
        {
          status: data.errorCode,
          text: data.message
        }
      );
    }

    cache.set(url, { ...mergedData, ...{ cached: new Date() } });

    return mergedData;
  }
}