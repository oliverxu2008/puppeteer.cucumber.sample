# Puppeteer Sample Framework with Cucumber

## Project Description:
Puppeteer Sample Framework with Cucumber.
Project structure as below:
- lib / config.js : defines baseUrl and Puppeteer running configuration like headless, etc
- lib / helpers.js : some common helper function
- features / sample.featre : BDD feature file
- feature / support / steps.js + world.js : step definition
- tests / sample.test.js : non-BDD Puppeteer test, which is used for initial test setup and debugging
- target: BDD test results report saved in this directory

`zsh
.
├── README.md
├── config.selectors
│   ├── index.js
│   └── selectors.main.js
├── features
│   ├── sample.feature
│   └── support
│       ├── steps.js
│       └── world.js
├── lib
│   ├── config.js
│   └── helpers.js
├── node_modules
├── package-lock.json
├── package.json
├── report.js
├── target
│   ├── cucumber_report.html
│   └── cucumber_report.json
└── tests
    └── sample.test.js
`

## Install
`npm install`

## How to run the basic test
`npm run test`

## how to run the BDD cucumber test and report
`
npm run test:bdd
npm run test:report
`
