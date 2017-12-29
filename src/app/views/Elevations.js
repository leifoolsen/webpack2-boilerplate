import elevation from '../styles/base/elevation.css';
import app from '../styles/app/app.css';

/** @jsx h */
import {h} from 'hyperapp';
import classnames from '../../utils/classnames';

export const Elevations = () =>
  <div>
    <h1>Elevation</h1>
    <p class={app.ingress}>In Material Design, elevation is the relative depth,
      or distance, between two surfaces along the z-axis. The elevation values
      are mapped out in a “z-space” and range from 0 to 24.
      Elevation in Material Design is defined
      in Material Design Guidelines,&nbsp;
      <a href="https://material.io/guidelines/material-design/elevation-shadows.html">
        Elevation &amp; shadows.
      </a>
    </p>
    <br/>
    <br/>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {[...Array(25)].map((x, i) =>
        <div key={`z${i}`} class={classnames(app.elevationdemo, elevation[`z${i}`])}>
          <h3>z{i}</h3>
        </div>
      )}
    </div>

    <blockquote>
      <p>To my amazement<br/>
        There stood a raven<br/>
        Whose shadow hung above my door<br/>
        Then through the silence<br/>
        It spoke the one word<br/>
        That I shall hear for evermore
      </p>
      <p><cite>The Raven, The Alan Parsons Project.</cite></p>
    </blockquote>

  </div>
;
