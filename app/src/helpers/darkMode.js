import { Dark } from 'quasar';

/**
 * Save dark mode status on local storage and update current app mode
 *
 * @param {boolean} val dark mode status
 */
export const setActiveStatus = (val) => {
  localStorage.setItem('dark-mode-active', val);
  Dark.set(val);
};

/**
 * Get dark mode from localstorage and current app mode
 *
 * @returns {boolean} If dark mode is enabled
 */
export const getActiveStatus = () => {
  const result = localStorage.getItem('dark-mode-active');
  return result === 'true' || Dark.isActive;
};

export const setLastStatus = () => {
  const active = getActiveStatus();
  setActiveStatus(active);
};
