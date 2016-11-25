# Webpack2 boilerplate

![webpack2-boilerplate](./webpack2-boilerplate.png)

A Webpack2 boilerplate, partly based on this Egghead.io course; [Using Webpack for Production JavaScript Applications](https://egghead.io/courses/using-webpack-for-production-javascript-applications)

## Features
* ES2015
* Node 6
* Npm as a task/build runner
* Webpack2 with tree-shaking
* Express middleware
* Linting with eslint and stylelint
* Unit tests with Mocha, Chai, Sinon and JsDom 
* Code coverage with Istanbul
* SASS boilerplate with Solved by Flexbox Holy Grail example layout
* Self hosting Google Material Icons and Font Roboto

## Getting started
* Install Node6 (via nvm)
* Clone this repository: `git clone https://github.com/leifoolsen/webpack2-boilerplate.git` (or download zip)
* CD to project directory: `cd webpack2-boilerplate`
* Remove existing git: `rm -rf .git`
* Install dependencies: `npm install`
* Run: `npm start`
* Open a browser at `http://localhost:8084`
* Press `Ctrl+C` to stop the devserver
* Init your git: `git init`
* Modify `package.json`, e.g. `name, author, description` 
* Add your own 3'rd party dependencies  to `package.json`
* Add those 3'rd party dependencies to `vendor` section in `webpack.config`
* Happy hacking :)

>**Note:** Remember to add your own repo to package.json 
```
  "repository": {
    "type": "git",
    "url": "https://github.com/<your-git>/<your-project>.git"
  },
```

## NPM Scripts
* `start`: run Express sever, with Hot Module Reloading (HMR), eslint and stylelint, serving files at http://localhost:8084
* `test`: run Mocha tests
* `test:watch`: run Mocha tests in watch mode
* `test:pattern`: will run Mocha tests and suites with names matching the given pattern, e.g.<br/>`pattern=Basic npm run test:pattern`
* `test:coverage`: run Istanbul code coverage (open `coverage/lcov-report/index.html` to view coverage report)
* `lint`: lint according to rules in `.eslintrc` and `.stylelintrc`
* `validate`: validate the integrety of the webpack config file and runs code coverage 
* `analyze`: run webpack-bundle-size-analyzer to analyze the output bundle sizes
* `clean`: remove the dist directory
* `build`: bundle the app to the dist dir using development settings
* `build:prod`: bundle the app to the dist dir using production settings
* `start:build`: run Express sever with the generated bundle, serving files at http://localhost:8000

## Test the bundle
* `npm run build:prod`
* `npm run start:build`
* Open a browser at `http://localhost:8000`

## Test the API
* Open a browser at `http://localhost:8000/api/ping`
