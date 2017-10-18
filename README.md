hexo-stargate-doc-theme
=======================

A **documentation theme** for [Hexo](https://hexo.io/) that focuses on presenting documentation (especially REST API documentation). It provides nice features, such as:

* Clean and Responsive Layout
* Search
* Swagger Integration (include swagger ui or generate beautiful html api references)
* Simple Configurable Navigation + TOC Navigation
* Google Analytics
* Customizable logo and favicon

![Theme Mockup](./mockup_1.jpg)

### Table Of Contents

* [Get Started](#get-started)
* [Why Hexo and why this theme?](#why)
* [Roadmap](#roadmap)
* [Development & Contributing](#development-and-contributing)
* [Credits](#credits)
* [License](#license)

## <a name="get-started"></a> Get Started

If you want to [Get Started](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/get-started.html) quickly we have setup a [step by step guide](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/get-started.html) that will walk you through the necessary steps, this should only take you around 5 minutes.

If you want to dive deeper, please check the **[User Documentation](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/)**.

## <a name="why"></a> Why Hexo and why this theme?

After a brief evaluation of other open-source tools able to generate static websites, we have chosen Hexo framework.
We love especially its extensibility and its plugin system, a few examples:
 * add custom tags
 * process any kind of sources
 * fully customizable layouts
 * ...[see extensions](https://hexo.io/api/)

Plus, as JavaScript/NodeJS developers we like to use a tool based on the same language that we use every day.

Our theme is fully open-source with a clear [LICENSE](#license) and it focuses on presenting documentation (especially REST API product documentation), something that we didn't find for Hexo.

## <a name="roadmap"></a> Roadmap

Even though our theme has a good set of features and is ready to be used, we also look forward to improvements, so ideas and feedbacks are more than welcome.

### Feature Ideas

* More sophisticated control over navigation, automatic filesystem based navigation (community feedback wanted)

* Swagger to HTML
  * Make implementation really robust, covering all the edge cases (community help wanted)
  * Support for Swagger 3.0
  * Fetch swagger files from remote locations
  * Request/response examples can be provided in an external file
  * Exclude APIs/operations from the output
  * Support markdown content

### Tech

* solid E2E Tests suite

## <a name="development-and-contributing"></a> Development & Contributing

People interested in contributing should have a look at:

* [Our Contributing Guidelines](./CONTRIBUTING.md)

* [The Changelog](./CHANGELOG.md)

### Environment Setup

Install `hexo-cli` globally:

```
$ npm install hexo-cli -g
```

Get the theme source and install dependencies:

```bash
$ git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme.git
$ cd hexo-stargate-doc-theme && npm install
```

Be sure that you can run test and linting tasks and that they are succeeding:

```
$ npm run test && npm run lint
```

If you want to update front-end visual aspects, we suggest to use our user documentation site as a playground to have a preview of your changes.

First [link](https://docs.npmjs.com/cli/link) the theme package globally, with:

```
$ cd hexo-stargate-doc-theme && npm link
```

Then get user documentation source and [link](https://docs.npmjs.com/cli/link) the theme package as a dependency, so your local version will be used:

```bash
$ git clone git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme-site.git
$ cd hexo-stargate-doc-theme-site && npm install && npm link hexo-stargate-doc-theme
```

Run the built-in server:

```bash
$ hexo s
```

Open your browser at http://localhost:4000, you should see the documentation site up and running.

### Test

Run tests with [Jest](https://facebook.github.io/jest/):

```
$ npm test
```

Coverage reports are generated at `target/coverage`

> Sometimes you need to run just one test suite and not all of them, to focus on one problem... you can do that by running:
```
$ npm run jest -- <regexp>
```
Where `<regexp>` represents a Regular Expression matching test file path(s). eg. `npm run jest -- search*`


### Lint

Lint the code using [ESLint](http://eslint.org/):

```
$ npm run lint
```

Run with `--fix` option to apply automatic fixes to code.

```
$ npm run lint --fix
```

### Compile

Compile JavaScript source and style source for the browser with [Webpack](https://github.com/webpack/webpack) and [node-sass](https://github.com/sass/node-sass):

```
$ npm run compile
```

**!!! ALWAYS !!!** compile and commit distribution artifacts after updating Javascript and/or SCSS files

### Release <small>(recommended workflow)</small>

Releasing is done **ONLY** by the **[MAINTAINERS](./MAINTAINERS)**.

1. Bump version in `package.json`

2. Run `npm run prerelease`

3. Commit and push

4. Open a PR

5. When PR is merged, tag and push

## <a name="credits"></a> Credits

* Thanks to [Esin Isik](https://www.linkedin.com/in/esinis/) for helping us out with **Design** and **UX**
* Projects that inspired us: [hexo-theme-meteor](https://github.com/meteor/hexo-theme-meteor), [slate](https://github.com/lord/slate), [gitbook](https://github.com/GitbookIO/gitbook), [readthedocs theme](https://github.com/rtfd/sphinx_rtd_theme).

## <a name="license"></a> License

The project source is in general licensed under the following MIT license
with the exception of some artifacts, where third party
source code might be included.

> See the [FULL LICENSE](./LICENSE) for more details.

The MIT License (MIT) Copyright © 2017 Zalando SE, https://tech.zalando.com

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

