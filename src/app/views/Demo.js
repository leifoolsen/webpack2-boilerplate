import {h} from 'hyperapp';
/** @jsx h */

import { Search } from '../components/demo/Search';

export const Demo = (/*state, actions*/) =>
  <div>
    <h1>From BEM to css-modules (WIP)</h1>
    <Search id="search-1" />
    <Search id="search-2" vivid />
  </div>;


/*
BEM version

import '../demo/search-bem.css';

<div class="search" role="search">
  <input id="search-1" class="search__input" type="text" />
  <button class="search__submit">Søk!</button>
</div>

<div class="search search--vivid" role="search">
  <input id="search-2" class="search__input" type="text" />
  <button class="search__submit search__submit--vivid">Søk!</button>
</div>
*/

