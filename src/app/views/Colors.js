import color from '../styles/base/color.css';
import app from '../styles/app/app.css';

/** @jsx h */
import {h} from 'hyperapp';
import classnames from '../../utils/classnames';

export const Colors = () =>
  <div>
    <h1>Colors</h1>
    <p class={app.ingress}>Color in Material Design is inspired by bold hues
      juxtaposed with muted environments, deep shadows, and bright highlights.
      Colors in Material Design are defined
      in Material Design Guidelines,&nbsp;
      <a href="https://material.io/guidelines/style/color.html">
        Color.
      </a>
    </p>
    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div key="textColorPrimary" class={classnames(app.colordemo, color.textColorPrimary)}>
        <h4>Primary text</h4>
      </div>
      <div key="textColorSecondary" class={classnames(app.colordemo, color.textColorSecondary)}>
        <h4>Secondary text</h4>
      </div>
      <div key="textColorDisabled" class={classnames(app.colordemo, color.textColorDisabled)}>
        <h4>Disabled text</h4>
      </div>
      <div key="primary" class={classnames(app.colordemo, color.primary)}>
        <h4>Primary</h4>
      </div>
      <div key="primaryLight" class={classnames(app.colordemo, color.primaryLight)}>
        <h4>Primary light</h4>
      </div>
      <div key="primaryDark" class={classnames(app.colordemo, color.primaryDark)}>
        <h4>Primary dark</h4>
      </div>
      <div key="secondary" class={classnames(app.colordemo, color.secondary)}>
        <h4>Secondary</h4>
      </div>
      <div key="secondaryLight" class={classnames(app.colordemo, color.secondaryLight)}>
        <h4>Secondary light</h4>
      </div>
      <div key="secondaryDark" class={classnames(app.colordemo, color.secondaryDark)}>
        <h4>Secondary dark</h4>
      </div>
      <div key="info" class={classnames(app.colordemo, color.info)}>
        <h4>Info</h4>
      </div>
      <div key="infoDark" class={classnames(app.colordemo, color.infoDark)}>
        <h4>Info dark</h4>
      </div>
      <div key="success" class={classnames(app.colordemo, color.success)}>
        <h4>Success</h4>
      </div>
      <div key="successDark" class={classnames(app.colordemo, color.successDark)}>
        <h4>Success dark</h4>
      </div>
      <div key="warning" class={classnames(app.colordemo, color.warning)}>
        <h4>Warning</h4>
      </div>
      <div key="warningDark" class={classnames(app.colordemo, color.warningDark)}>
        <h4>Warning dark</h4>
      </div>
      <div key="error" class={classnames(app.colordemo, color.error)}>
        <h4>Error</h4>
      </div>
      <div key="errorDark" class={classnames(app.colordemo, color.errorDark)}>
        <h4>Error dark</h4>
      </div>
    </div>
    <blockquote>
      <p>WATCH OUT WHERE THE HUSKIES GO<br/>
        AN' DON'T YOU EAT THAT YELLOW SNOW</p>
      <p><cite>Don't Eat The Yellow Snow, Frank Zappa</cite></p>
    </blockquote>

  </div>
;
