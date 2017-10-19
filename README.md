hexo-doc-theme
=======================

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/zalando-incubator/hexo-theme-doc.svg?branch=master)](https://travis-ci.org/zalando-incubator/hexo-theme-doc) 

hexo-doc-theme is a **documentation theme** for [Hexo](https://hexo.io/), the fast and powerful blog framework powered by Node.js. It differs from other Hexo themes by allowing you to present documentation—especially REST API documentation. Created by JavaScript/Node.js developers, hexo-doc-theme capitalizes on Hexo's [extensibility](https://hexo.io/api/) and system of plugins for adding custom tags, customizing layouts, and processing multiple kinds of sources, which makes generating static websites simpler than other tools.

hexo-doc-theme's features include:

* A clean and responsive layout
* Search
* [Swagger](https://swagger.io/) integration, including [Swagger UI](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/usage-and-configuration/swagger-ui.html) support and the ability to generate [beautiful HTML API references](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/usage-and-configuration/swagger-to-html.html)
* Simple, configurable navigation, including for Tables of Contents
* Google Analytics
* Customizable logo and favicon

Visit our **[demo](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site)** to view an example of hexo-doc-theme in action.

![Theme Mockup](./mockup_1.jpg)

### Table of Contents

* [Get Started](#get-started)
* [Feature Roadmap](#feature-roadmap)
* [Development & Contributing](#development-and-contributing)
* [Credits](#credits)
* [License](#license)

## <a name="get-started"></a> Get Started

Our [step-by-step guide](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/get-started.html) aims to get you running with hexo-stargate-doc-theme in five minutes or less. For a deeper dive, check our **[user documentation](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/)**.

## <a name="roadmap"></a> Feature Roadmap

hexo-doc-theme is currently in development at [Zalando](https://jobs.zalando.com/tech/) and useful out-of-the-box to others. We welcome suggestions/feedback and [contributions](./CONTRIBUTING.md), especially on these planned features:

* More sophisticated control over navigation/automatic filesystem-based navigation (**community feedback priority**)
* Swagger to HTML
  * Make implementation more robust, and covering all edge cases (**development priority**)
  * Support for Swagger 3.0
  * Ability to fetch Swagger files from remote locations
  * Ability to provide request/response examples in an external file
  * Exclusion of APIs/operations from output
  * Markdown content support

For more info on our progress, visit the [changelog](./CHANGELOG.md) contributions.

### Environment Setup
To get started with hexo-doc-theme, you need to install [NodeJS](https://nodejs.org/en/) and [Git](https://git-scm.com/). Then install `hexo-cli` globally:

```
$ npm install hexo-cli -g
```

Get the theme source and install the dependencies:

```bash
$ git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme.git
$ cd hexo-stargate-doc-theme && npm install
```

Ensure that you can successfully run test and linting tasks:

```
$ npm run test && npm run lint
```

If you want to update the visual aspects of your front-end, we suggest using our [user documentation](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/) site as a playground for previewing your changes. First, [link](https://docs.npmjs.com/cli/link) the theme package globally with:

```
$ cd hexo-stargate-doc-theme && npm link
```

Then get the user documentation source and [link](https://docs.npmjs.com/cli/link) the theme package as a dependency (this will use your local version):

```bash
$ git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme-site.git
$ cd hexo-stargate-doc-theme-site && npm install && npm link hexo-stargate-doc-theme
```

Run the built-in server:

```bash
$ hexo s
```

Open your browser at http://localhost:4000, and hopefully you'll see the documentation site up and running.

### Test

Run tests with Facebook's [Jest](https://facebook.github.io/jest/) (currently the only testing tool compatible with hexo-doc-theme):

```
$ npm test
```

Coverage reports are generated at `target/coverage`. Sometimes you'll only need to run one test suite focused on a single problem; do that by running:

```
$ npm run jest -- <regexp>
```

`<regexp>` represents a Regular Expression, matching test file path(s)—eg. `npm run jest -- search*`.

### Lint

Lint the code using [ESLint](http://eslint.org/) (currently the only linting tool compatible with hexo-stargate-doc-theme):

```
$ npm run lint
```

To apply automatic fixes to your code, run it with the `--fix` option:

```
$ npm run lint --fix
```

### Compile

Use [Webpack](https://github.com/webpack/webpack) and [node-sass](https://github.com/sass/node-sass) to compile your JavaScript source and style source for the browser:

```
$ npm run compile
```

**!!! ALWAYS !!!** compile and commit distribution artifacts after updating Javascript and/or SCSS files.

### Release <small>(recommended workflow)</small>

Only the [maintainers](./MAINTAINERS)** perform releases. Our preferred workflow:

1. Bump version in `package.json`
2. Run `npm run prerelease`
3. Commit and push
4. Open a PR
5. When PR is merged, tag and push

## <a name="credits"></a> Credits

* Thanks to [Esin Isik](https://www.linkedin.com/in/esinis/) for helping us out with **Design** and **UX**
* Projects that inspired us: [hexo-theme-meteor](https://github.com/meteor/hexo-theme-meteor), [slate](https://github.com/lord/slate), [gitbook](https://github.com/GitbookIO/gitbook), [readthedocs theme](https://github.com/rtfd/sphinx_rtd_theme).

## <a name="license"></a> License

See the [full license](./LICENSE) for details.

Copyright 2017, Zalando SE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
