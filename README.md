# Webpack2 boilerplate

![webpack2-boilerplate](./webpack2-boilerplate.png)

A Webpack2 boilerplate, partly based on this Egghead.io course; 
[Using Webpack for Production JavaScript Applications](https://egghead.io/courses/using-webpack-for-production-javascript-applications)

## Features
* ES2015/ES2016
* Node6 or Node7
* Npm as a task/build runner
* [Webpack2](https://webpack.js.org/) with tree-shaking and hot module replacement (HMR)
* Webpack [DLL plugin](https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin) for [faster builds](https://robertknight.github.io/posts/webpack-dll-plugins/)
* Load polyfills on demand using [dynamic import](https://webpack.js.org/guides/code-splitting-import/#dynamic-import)
* Node Express middleware
* Linting with eslint and stylelint
* Unit tests with Mocha, Chai, Sinon and JsDom
* Integration tests with Node Express server 
* Acceptance testing with WebdriverIO, Cucumber.js, and Node Express
* Code coverage and reporting with Istanbul
* SASS boilerplate with Solved by Flexbox Holy Grail example layout
* Self hosting Google Material Icons and Font Roboto
* Framework agnostic. No dependencies to frameworks like React or Angular
* Uses [husky](https://github.com/typicode/husky) to prevent bad commits

### Husky
This project uses [husky](https://github.com/typicode/husky) to run scripts
before an actual `git commit`

More details about Husky can be found here:
* [Prevent bad git commits and pushes with Husky](http://www.penta-code.com/prevent-bad-git-commits-and-pushes-with-husky/)
* [Prevent Bad Commits with husky](https://davidwalsh.name/prevent-bad-commits-husky)

## Get started
* Install Node6 or Node7 (via nvm)
* Clone this repository: `git clone https://github.com/leifoolsen/webpack2-boilerplate.git` (or download zip)
* CD to project directory: `cd webpack2-boilerplate`
* Remove existing git: `rm -rf .git`
* Install dependencies: `npm install`
* Build dll: `npm run build:dll`
* Init your git: `git init`
* Modify `package.json`, e.g. `name, author, description, repository` 
* Add your own 3'rd party dependencies  to `package.json`
* Add those 3'rd party dependencies to `./src/vendor.js`
* Happy hacking :)

>**Note:** Remember to add your own repo to package.json 
```
  "repository": {
    "type": "git",
    "url": "https://github.com/<your-git>/<your-project>.git"
  },
```

## NPM Scripts
* `start`: run Express sever with Hot Module Reloading (HMR), eslint and stylelint, serving files at http://localhost:8084
* `test`: run unit tests and integration tests
* `test:watch`: run unit tests in watch mode
* `test:single`: run a single test file in watch mode, e.g.<br/>`npm run test:single test/unit/logger/logger.spec.js`<br/>`npm run test:single test/integration/server/server.spec.js`
* `test:pattern`: will run tests and suites with names matching the given pattern, e.g.<br/>`pattern=logger npm run test:pattern` will run only the `logger` tests
* `lint`: lint according to rules in `.eslintrc` and `.stylelintrc`
* `analyze`: run webpack-bundle-size-analyzer to analyze the output bundle sizes<br/>**Note:** There is a `console.log` statement at the top of the `webpack.config` file that must be removed before this script can be run
* `clean`: remove dist and coverage directory
* `build`: bundle the app to the dist dir using development settings
* `build:prod`: bundle the app to the dist dir using production settings
* `server`: run Express sever with the generated bundle, serving files at http://localhost:8000
* `precommit`: husky run command for the git pre-commit hook

## Start coding
* Run: `npm start`
* Open a browser at `http://localhost:8084`
* Add/modify code
* Press `Ctrl+C` to stop the dev server

### Try the API
* Run: `npm start`
* Click the "Ping" button or open a browser at `http://localhost:8084/api/ping`. The response should be: `{"ping":"pong!"}`

### Try the bundle
* `npm run build:prod`
* `npm run server`
* Open a browser at `http://localhost:8000`

### 3'rd party dependencies
Add your 3'rd party dependencies to `vendor.js`.
* See: [OPTIMIZING WEBPACK FOR FASTER REACT BUILDS](http://engineering.invisionapp.com/post/optimizing-webpack/)
* See: [Optimizing Webpack build times and improving caching with DLL bundles](https://robertknight.github.io/posts/webpack-dll-plugins/)
* See: [Webpack Plugins we been keepin on the DLL](https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7)

### Polyfills
Add your polyfills to `polyfill.js`
* See: [Code Splitting - Using import()](https://webpack.js.org/guides/code-splitting-import/)
* See: [WE DON'T NEED YOUR POLYFILLS!](http://anzorb.com/we-dont-need-your-polyfills/)
* See: [Polyfills: everything you ever wanted to know, or maybe a bit less](https://hackernoon.com/polyfills-everything-you-ever-wanted-to-know-or-maybe-a-bit-less-7c8de164e423)
* See: [Conditionally load multiple Polyfills using Webpack, Promises and Code Splitting](http://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting)

## Running tests
Tests are divided into three categories; unit tests, integration tests and 
acceptance tests. Unit tests and integration tests uses Moca as a test runner. 
The acceptance tests uses WebdriverIO as a test runner. Istanbul is used
for code coverage and reporting. 

### Unit tests
The following libraries are used:
* Mocha
* Chai
* Sinon
* JsDom headless browser
* Istanbul

To run the unit tests type: `npm run test:unit`

### Integration tests
The following libraries are used:
* Mocha
* Chai
* Supertest
* ExpressJS
* Istanbul
 
To run the ingtegration tests type: `npm run test:it`
 
### Acceptance tests
The following libraries are used:
* WebdriverIO
* WDIO Selenium standalone service
* Selenium standalone
* Cucumber
* Chai
* ExpressJS

For now, the (standalone) acceptance tests must be run manually. The only way to 
ro run standalone acceptance tests on a CI server, is to use a headless browser 
like PhantomJS (I think). Unfortunatley I have so far had no success running 
acceptance tests using PhantomJS.

#### Required steps to run acceptance tests
```bash
# npm install - just in case
npm install

# Make bundle
npm run build:prod

# Fetch actual Seleninum distro
./node_modules/.bin/selenium-standalone install

# Run acceptance tests
npm run wdio

# Expected output

------------------------------------------------------------------
[chrome #0-0] Session ID: e0bf7b24-2bfa-4053-ad47-1e87d5fe409a
[chrome #0-0] Spec: ~/dev/webpack2-boilerplate/test/features/example.feature
[chrome #0-0] Running: chrome
[chrome #0-0]
[chrome #0-0] Title check
[chrome #0-0]
[chrome #0-0]     Get the title of webpage
[chrome #0-0]       ✓ I open the url "http://localhost:8082/"
[chrome #0-0]       ✓ I expect the title of the page to be "Webpack2 Boilerplate"
[chrome #0-0]
[chrome #0-0]     Click the Ping button
[chrome #0-0]       ✓ I open the url "http://localhost:8082/"
[chrome #0-0]       ✓ I click the Ping button
[chrome #0-0]       ✓ I expect the response to be "pong!"
[chrome #0-0]
[chrome #0-0]
[chrome #0-0] 5 passing (5s)

```

>**Chromedriver**<br/>
>According to the [WebdriverIO Get Stared guide](http://webdriver.io/guide/getstarted/install.html),
>the [Chromedriver standalone server](https://sites.google.com/a/chromium.org/chromedriver/home)
>is required for running Chrome browser tests on a local machine. On 
>latest Ubuntu and OSX I have run the tests **without installing the Chromedriver**. 
>So far I have not experienced any problems running the tests without 
>the Chrome Driver. If you must install Chromedriver, instructions can be found
>e.g. [here](https://sites.google.com/a/chromium.org/chromedriver/home), 
>[here](https://fossies.org/linux/electron/docs/tutorial/using-selenium-and-webdriver.md)
>and [here](https://github.com/Matt-B/cucumber-js-selenium-webdriver-example). 

### Test coverage
`npm run build:prod`, then browse `./coverage/index.html`, 
`./coverage/unit/index.html`, `./coverage/integration/index.html`  

### e2e tests
e2e tests are not implemented in this boilerplate, but basically they are equal 
to the integration tests. The main difference is that you use a proxy to connect
to a "real" api server before running your client api tests. A sample e2e test
using a proxy can be found in the
[./test/integration/proxy](./test/integration/proxy) directory.

To see it in action, run the `test:proxy-example` script.

## How to use the boilerplate with React
The boilerplate may, with a few modifications, be used with React.
 
### Install required packages
```bash
# dependencies
npm i -S react
npm i -S react-dom

# devdependencies
npm i -D babel-preset-react 
npm i -D react-hot-loader@3.0.0-beta.6
```

### Add React dependencies to `src/vendor.js`
```javascript
import 'moment';
import 'react';
import 'react-dom';
```

### Modify `.babelrc`

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "ie >= 11"]
      }
    }],
    "react",
    "stage-0"
  ],
  "env": {
    "development": {
      "plugins": [
        "react-hot-loader/babel"
      ]
    },
    "test": {
    },
    "production": {
    }
  }
}
```

### Modify `webpack.config.babel.js`

#### entry.app
Add 'react-hot-loader/patch'

```javascript
app: (!isHot ? [] : [
  './webpack-public-path.js',
  // Put react-hot-loader/patch before webpack-hot-middleware,
  // see: https://github.com/gaearon/react-hot-loader/issues/243
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?path=${path.join(publicPath, '__webpack_hmr')}&reload=true`,
]).concat([
  './styles.scss',
  './index.js'
]),
```

#### modules.rules.test: /\.js[x]?$/
Add 'react-hot-loader/babel'

```javascript
{
  test: /\.js[x]?$/,
  include: [src],
  exclude: [/node_modules/],
  loader: 'babel-loader',
  query: {
    'plugins': isHot ? [
      'react-hot-loader/babel'
    ] : []
  }
},
```

### Start coding React
Enjoy your React coding :-)
