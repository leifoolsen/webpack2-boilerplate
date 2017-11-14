/*
 * Copied from: https://github.com/marcusasplund/hyperapp-todo-simple/blob/master/src/utils/local-storage.js
 */
const getStateFromStorage = () =>
  JSON.parse(window.localStorage.getItem('boilerplate'));

const storeStateInStorage = (state) =>
  window.localStorage.setItem('boilerplate', JSON.stringify(state));

export {getStateFromStorage, storeStateInStorage};
