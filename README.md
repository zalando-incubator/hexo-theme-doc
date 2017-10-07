hexo-stargate-doc-theme
=======================

A documentation theme for [Hexo](https://hexo.io/)

* [Get Started](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/getting-started.html)
* [User Documentation](https://pages.github.bus.zalan.do/stargate/hexo-stargate-doc-theme-site/)
* [Why Hexo?](#why-hexo)
* [Why this theme?](#why-theme)
* [Roadmap and Next Steps](#roadmap-next-steps)
* [Development & Contributing](#development-and-contributing)


![Theme Mockup](./mockup.jpeg)


## <a name="why-hexo"></a> Why Hexo?

After a brief evaluation of other open-source tools able to generate static websites, we have chosen Hexo framework, mostly for its extensibility.

Plus, as Javascript/NodeJS developers we like to use a tool based on the same language that we use every day.

## <a name="why-theme"></a> Why this theme?

We didn't find a open source theme (with a clear LICENSE policy) for Hexo with a focus on presenting documentation (especially REST API products documentation).

Plus, our goal with this theme is to provide a tool with everything included such as: Search, Swagger Integration, etc.

## <a name="roadmap-next-steps"></a> Roadmap / Next steps

### Features

* More sophisticated control over navigation
  * Collapsable navigation entries
  * Navigation branches reflecting the file system structure

* New shiny visual design is coming...

* Re-enable optional blog capabilities.

* Swagger to HTML
  * Make the implementation robust to parse different variations of Swagger 2.0 schema.
  * Add support for Swagger 3.0.
  * Fetch swagger files from remote locations.
  * Provide a way to download swagger specifications.
  * Provide a way so that request/response examples can be provided in an external file.
  * Provide a way to exclude APIs/operations from the output.
  * Provide support for markdown content.

### Tech

* Replace ES5/VanillaJS with ES6 React components

* E2E Tests


<br>


## <a name="development-and-contributing"></a> Development & Contributing

People interested in contributing should have a look at:

* [Our Contributing Guidelines](./CONTRIBUTING.md)

* [The Changelog](./CHANGELOG.md)

### Environment Setup

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

> Coverage reports are generated at `target/coverage`

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

> **!!! ALWAYS !!!** compile and commit distribution artifacts after updating javascript and/or scss files

### Release <small>(recommended workflow)</small>

1. Bump version in `package.json`

2. Run `npm run prerelease`

3. Commit and push

4. Open a PR

5. When PR is merged, tag and push

## License
[The MIT License (MIT)](./LICENSE)
