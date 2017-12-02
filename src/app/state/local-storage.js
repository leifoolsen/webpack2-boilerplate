/*
 * Copied from: https://github.com/marcusasplund/hyperapp-todo-simple/blob/master/src/utils/local-storage.js
 */
const getStateFromStorage = () => {
  try {
    return JSON.parse(window.localStorage.getItem('boilerplate'));
  }
  catch (e) {
    return {};
  }
};

const storeStateInStorage = state =>
  window.localStorage.setItem('boilerplate', JSON.stringify(state));

export {getStateFromStorage, storeStateInStorage};
