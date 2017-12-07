# CSS to draw a diagonal

```html
import header from './masthead.css';

<header class={header.Masthead} role="banner">
  <div class={header['Masthead-left']}>
  </div>
  <div class={header['Masthead-diagonal']}></div>
  <div class={header['Masthead-right']}>
    <h1>Header with diagonal divider</h1>
  </div>
</header>
```

```css
.Masthead {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
  background: red;
  color: white;
  height: 86px;
}

.Masthead-left {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 0 0 16px;
  background: yellow;
  color: black;
  min-width: 192px;
}

.Masthead-diagonal {
  margin: 0;
  padding: 0;
  border-right: 40px solid red;
  border-bottom: 86px solid yellow;
}

.Masthead-right {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 0;
  padding: 0 0 0 16px;
}
```
