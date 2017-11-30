import {h} from 'hyperapp';
/** @jsx h */

const paragraph1 = () =>
  <p>Unlike responsive typography, which changes only at set breakpoints,
    fluid typography resizes smoothly to match any device width. It is an
    intuitive option for a web in which we have a practically infinite
    number of screen sizes to support. Yet, for some reason, it is still
    used far less than responsive techniques.
  </p>;

export const Typography = () =>
  <div>
    <h1>H1: Responsive Font Size And Fluid Typography With vh And vw Units</h1>
    { paragraph1() }
    <p>
      This might be because typography is so deeply rooted in the
      centuries-old history of typesetting. The concept of having “fluid”
      anything is often at odds with this tradition. In print, dimensions
      have always been fixed, but they don’t need to be on the web. That’s
      why fluid typography could be a perfect match for the web. It’s a
      different approach for a completely different medium.
    </p>
    <p>If you would like to know more about this technique, read the Smashing
      Magazine artiche <a href="https://www.smashingmagazine.com/2016/05/fluid-typography/">
        Responsive Font Size And Fluid Typography With vh And vw Units</a>
    </p>
    <h2>H2: Responsive Font Size And Fluid Typography With vh And vw Units</h2>
    { paragraph1() }

    <h3>H3: Responsive Font Size And Fluid Typography With vh And vw Units</h3>
    { paragraph1() }

    <h4>H4: Responsive Font Size And Fluid Typography With vh And vw Units</h4>
    { paragraph1() }

    <h5>H5: Responsive Font Size And Fluid Typography With vh And vw Units</h5>
    { paragraph1() }

    <h6>H6: Responsive Font Size And Fluid Typography With vh And vw Units</h6>
    { paragraph1() }
  </div>;
