hexo-stargate-doc-theme
=======================

[Hexo](https://hexo.io/) documentation theme with love by Team Stargate.

Originally based upon the [theme](https://github.com/meteor/hexo-theme-meteor) used by [meteor](https://guide.meteor.com/) framework.

* [User Documentation](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/)
* [Development & Contributing](#development-and-contributing)

## Why Hexo?

After a brief evaluation of other open-source tools able to generate static websites, we have chosen Hexo, mostly for its “customizability” and “pluggability”.

Plus, as Javascript/NodeJS developers we like to use a tool based on the same language that we use every day.

## Why this theme?

We didn't find a open source theme (with a clear LICENSE policy) for Hexo with a focus on presenting documentation (especially REST API products documentation).

Plus, our goal with this theme is to provide a tool with everything included such as: Search, Swagger Integration, etc.

## Roadmap / Next steps

### Features

* More sophisticated control over navigation
  * Collapsable navigation entries
  * Navigation branches reflecting the file system structure

* Improve Swagger To HTML viewer

* New shiny visual design is coming...

* Re-enabling optional blog capabilities

### Tech

* Replace ES5/VanillaJS with ES6 React components

* E2E Tests


## <a name="development-and-contributing"></a> Development & Contributing

People interested in contributing should have a look at:

* [Our Contributing Guidelines](./CONTRIBUTING.md)

* [The Changelog](./CHANGELOG.md)

## Recommended Development Environment Setup

Get the theme source and [link it](https://docs.npmjs.com/cli/link) as a global module

```bash
git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme.git
cd hexo-stargate-doc-theme && npm install && npm link
```

Get the theme documentation and link the theme:

```bash
git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme-site.git
cd hexo-stargate-doc-theme-site && npm install && npm link hexo-stargate-doc-theme
```

> To have a visual preview of the theme you can use `hexo-stargate-doc-theme-site`
```bash
cd hexo-stargate-doc-theme-site && hexo s
```

### Test

Run tests with [Jest](https://facebook.github.io/jest/)

```
$ npm test
```

#### Testing strategy

* Write unit tests just when it makes sense:
  * you don't have to mock all world
  * the unit that you are testing is complex enough and does some computation that is worth testing

* Do more functional/integration/e2e tests:
  * Given the "physiognomy" of the software, favor functional/integration/e2e testing.
  * In the majority of the cases, to really assure that the software is working as expected, what you have to check is that, for a given input the generated output by Hexo is correct and usable over a real file system and a real browser.

### Lint

Lint the code using [ESLint](http://eslint.org/).

```
$ npm run lint
```

Run with `--fix` option to apply automatic fixes to code.

```
$ npm run lint -- --fix
```

### Compile

Compile javascript source and style source for the browser with webpack and node-sass

```
$ npm run compile
```

### Release <small>(recommended workflow)</small>

1. Bump version in `package.json`

2. Run `npm run prerelease`

3. Commit and push

4. Open a PR

5. When PR is merged, tag and push
