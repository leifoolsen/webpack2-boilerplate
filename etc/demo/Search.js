import search from './search-pcss.css';

import {h} from 'hyperapp';
/** @jsx h */

export const Search = ({ id, vivid }) =>
  <div class={vivid ? search.vivid : search.normal} role="search">
    <input id={id} class={search.input} type="text" />
    <button class={vivid ? search['submit-vivid'] : search.submit}>Search!</button>
  </div>;
