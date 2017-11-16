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

Install [Selenium](http://www.seleniumhq.org/) and webdriver(s) with:

```
$ npm run test:setup
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

### Travis CI

E2E tests are running also and especially on Travis CI whenever a change is detected, reports and screenshots (on failure) are uploaded on a [AWS S3 Bucket](https://s3.console.aws.amazon.com/s3/buckets/zalando-incubator-hexo-theme-doc/?region=us-east-1).
Every build for the "theme" source will create a folder using the build number as the name of the folder.
Every build for "gh-pages" source will create a subfolder under `gh-pages-source` folder using the build number as the name of the folder.

A specific ["user"](https://console.aws.amazon.com/iam/home?#/users/hexo-theme-doc-travis) with a specific IAM policy attached was created.
A set of credentials belonging to the user (ACCESS_KEY_ID and SECRET_ACCESS_KEY) was created to authorize the AWS Client on Travis CI.

Credentials are injected on Travis CI as [secured environment variables](https://travis-ci.org/zalando-incubator/hexo-theme-doc/settings).


## License
[The MIT License (MIT)](./LICENSE)
