import {h} from 'hyperapp';
/** @jsx h */
import colors from '../styles/base/colors.css';

export const Colors = () =>
  <div>
    <h1>Colors</h1>
    <p class={colors.primary}>Primary</p>
    <p class={colors.primaryLight}>Primary light</p>
    <p class={colors.primaryDark}>Primary dark</p>
    <p class={colors.secondary}>Secondary</p>
    <p class={colors.secondaryLight}>Secondary light</p>
    <p class={colors.secondaryDark}>Secondary dark</p>
    <p class={colors.textColorPrimary}>Primary text</p>
    <p class={colors.textColorSecondary}>Secondary text</p>
    <p class={colors.textColorDisabled}>Disabled text</p>
    <p class={colors.textColorIcon}>Icon</p>
  </div>
;
