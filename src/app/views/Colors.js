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
    <p class={colors.info}>Info</p>
    <p class={colors.infoDark}>Info dark</p>
    <p class={colors.success}>Success</p>
    <p class={colors.successDark}>Success dark</p>
    <p class={colors.warning}>Warning</p>
    <p class={colors.warningDark}>Warning dark</p>
    <p class={colors.error}>Error</p>
    <p class={colors.errorDark}>Error dark</p>
    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <button class={colors.primary} type="button">Primary</button>
      <button class={colors.secondary} type="button">Secondary</button>
      <button class={colors.info} type="button">Info</button>
      <button class={colors.success} type="button">Success</button>
      <button class={colors.warning} type="button">Warning</button>
      <button class={colors.error} type="button">Error</button>
    </div>
    <p class={colors.textColorPrimary}>Primary text</p>
    <p class={colors.textColorSecondary}>Secondary text</p>
    <p class={colors.textColorDisabled}>Disabled text</p>
    <p class={colors.textColorIcon}>Icon</p>

    <blockquote>
      <p>WATCH OUT WHERE THE HUSKIES GO<br/>
        AN' DON'T YOU EAT THAT YELLOW SNOW</p>
      <p><cite>Don't Eat The Yellow Snow, Frank Zappa</cite></p>
    </blockquote>

  </div>
;
