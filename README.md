hexo-stargate-doc-theme
=======================

[Hexo](https://hexo.io/) documentation theme with love by Team Stargate.

## Features

* Search
* Swagger Integration
* Responsive Layout
* Toc sidebar navigation

## Install and Usage

Install the theme:

```bash
$ npm install git+ssh://git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme.git
```

Symlink it in the `theme` folder (where Hexo expect themes):

```bash
$ ln -s ../node_modules/hexo-stargate-doc-theme ./themes/stargate-doc
```

Activate the theme in Hexo configuration (`_config.yml`):

```yaml
theme: stargate-doc
```

#### Search

Search is active by default and at the moment cannot be deactivated (you always need search for a good documentation site! :sunglasses:)

The implementation is based on [lunr](https://lunrjs.com/).

##### Front-matter

Search exposes the following properties usable in the [front-matter](https://hexo.io/docs/front-matter.html) block of markdown files:

* **search**:
  * possible values: `exclude|only|true`
  * default: `true`
  * example:
    ```md
    ---
    search: exclude
    title: My Page
    ---

    # My Page

    This page will be excluded from the search index
    ...
    ```


### Hexo Project Dependencies

Below the minimal required dependencies for an Hexo project to be able to run and using the theme.

```json
"dependencies": {
  "hexo": "^3.3.7",
  "hexo-cli": "^1.0.3",
  "hexo-server": "^0.2.1",
  "hexo-renderer-marked": "^0.2.10",
  "hexo-renderer-ejs": "^0.2.0",
  "hexo-renderer-less": "^0.2.0",
  "hexo-stargate-doc-theme": "git+ssh://git@github.bus.zalan.do:stargate/hexo-stargate-doc-theme.git"
}
```

## Development & Contributing

### Test

Run tests with [Jest](https://facebook.github.io/jest/)

```
$ npm test
```

### Compile

Compile javascript source for the browser with webpack.

```
$ npm run compile
```



