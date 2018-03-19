# hexo-theme-doc-site

[User Documentation website](https://zalando-incubator.github.io/hexo-theme-doc) source for [hexo-theme-doc](https://github.com/zalando-incubator/hexo-theme-doc) package.

## Install

```bash
$ npm install hexo-cli -g && npm install --prod
```

## Run

```bash
$ hexo s
```

## Contributing

Please refer to our [contributing guidelines](./CONTRIBUTING.md)

## Deploy

```bash
$ npm run generate && npm run deploy
```

## E2E tests

This project includes e2e tests used to check major use cases when changing something in the theme source or/and in the site source.

Tests are performed with the help of [Selenium](http://www.seleniumhq.org/) and [Nightwatch.js](http://nightwatchjs.org/).

To get started with E2E Tests, please follow the steps below:

### Setup

Install also **development dependencies** with:

```
$ npm install
```

### Generate the documentation website

```
$ npm run generate
```

### Serve the documentation website

```
$ npm run serve
```

### Run tests

In another terminal launch the test runner:

```
$ npm test
```

## License
[The MIT License (MIT)](./LICENSE)
