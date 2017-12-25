import elevation from '../styles/base/elevation.css';
import app from '../styles/app/app.css';

/** @jsx h */
import {h} from 'hyperapp';
import classnames from '../../utils/classnames';

export const Elevations = () =>
  <div>
    <h1>Elevation</h1>
    <p>In Material Design, elevation is the relative depth, or distance,
      between two surfaces along the z-axis.
      See: <a href="https://material.io/guidelines/material-design/elevation-shadows.html#">
        Material Design– Elevation &amp; shadows
      </a>
    </p>
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
