import {h} from 'hyperapp';
/** @jsx h */
import colors from '../styles/base/colors.css';

export const Colors = () =>
  <div>
    <h1>Colors</h1>
    <p className={colors.primary}>Primary</p>
    <p className={colors.primaryLight}>Primary light</p>
    <p className={colors.primaryDark}>Primary dark</p>
    <p className={colors.secondary}>Secondary</p>
    <p className={colors.secondaryLight}>Secondary light</p>
    <p className={colors.secondaryDark}>Secondary dark</p>
    <p className={colors.info}>Info</p>
    <p className={colors.infoDark}>Info dark</p>
    <p className={colors.success}>Success</p>
    <p className={colors.successDark}>Success dark</p>
    <p className={colors.warning}>Warning</p>
    <p className={colors.warningDark}>Warning dark</p>
    <p className={colors.error}>Error</p>
    <p className={colors.errorDark}>Error dark</p>
    <br/>
    <div style={{display: 'flex'}}>
      <button className={colors.primary} type="button">Primary</button>
      <button className={colors.secondary} type="button">Secondary</button>
      <button className={colors.info} type="button">Info</button>
      <button className={colors.success} type="button">Success</button>
      <button className={colors.warning} type="button">Warning</button>
      <button className={colors.error} type="button">Error</button>
    </div>
    <p className={colors.textColorPrimary}>Primary text</p>
    <p className={colors.textColorSecondary}>Secondary text</p>
    <p className={colors.textColorDisabled}>Disabled text</p>
    <p className={colors.textColorIcon}>Icon</p>
  </div>
;
