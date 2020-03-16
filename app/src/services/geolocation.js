import axios from 'axios';

/**
 * Get the geoconding data for the latitute and longitude
 * This is an open API and don't support too many requests
 * In the future a better API can be used
 *
 * @param {number} lat The address latitude
 * @param {number} long The address longitude
 * @return {promise} A promise from axios request
 */
export const getGeocoding = (lat, long) => (
  axios.get(`https://geocode.xyz/${lat},${long}?json=1`)
);
