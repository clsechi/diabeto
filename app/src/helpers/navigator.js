
/**
 * Checks for permission of the feature name in browser
 * Throw an error if persmissions feature has no support
 *
 * @param {string} permission The permission name to be checked
 * @returns {promise} An promise from permissions query
 */
export const checkForPermission = async (permission) => {
  if ('permissions' in navigator) {
    return navigator.permissions.query({ name: permission });
  }
  throw new Error('Unable to find permissions in navigator');
};
