hexo-stargate-doc-theme
=======================

[Hexo](https://hexo.io/) documentation theme with love by Team Stargate.

## Features

* Search
* Swagger Integration
* Responsive Layout
* Customizable Navigation
* Automatic TOC Sidebar Navigation
* Customizable Favicon
* Google Analytics Integration

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

### Configuration/Customization

You can modify site settings in `_config.yml` or in an [alternate config file](https://hexo.io/docs/configuration.html#Using-an-Alternate-Config) and/or using [front-matter](https://hexo.io/docs/front-matter.html) values.

> Certain features like for example [navigation](#navigation) requires the presence of extra YAML file in your `./source/data` folder.
For more informations check [data-files](https://hexo.io/docs/data-files.html) documentation.

#### <a name="navigation"></a> Navigation

Navigation is fully customizable by updating a `navigation.yaml` file in your `source/data` folder.
Within that file you will describe how the `navigation` links will be presented to the final user.

Navigation entries are grouped by **category**, Eg:

```yaml
{
  "logo": {
    # ...
  },
  "main": [
    # ...
  ]
}
```

Right now there are two main navigation **categories**:

* **logo**: used to define the values for the logo in the top navigation bar
* **main**: used to define the values showed in the left sidebar

For each navigation item you **must** define a `type` and, depending on the `type`, other attributes such as `text` and/or `path`.

Each navigation item can have a special property called `children`.

As you might have guessed, this property gives you the ability to "nest" navigation entries, defining a multi-level navigation structure. Eg:

```yaml
{
  "logo": {
    "text": "My Documentation",
    "type": "link",
    "path": "index.html"
  },
  "main": [ # sidebar
    {
      "text": "PROJECTS",
      "type": "label"
    },
    {
      "text": "My Awesome Projects",
      "type": "link",
      "path": "projects/my-awesome-project.html",
      "children": [{
        "text": "My Awesome Projects Page 1",
        "type": "link",
        "path": "projects/my-awesome-project-page-1.html",
      }]
    }
  ]
}
```


Right now there are two `types` of navigation items:

* **label**: navigation item as label (it's not an anchor so it doesn't need a `path` value)
* **link**: navigation item as link (here you **must** define the `path` value)

> The "path" value for a navigation item is just the `filepath` of the markdown file, relative to the `source` folder but with `.html` as extension.


#### Favicon

Fill in `favicon` property with the path pointing to your favicon (always relative to `source` folder)

```yaml
theme_config:
  favicon: path/to/favicon.ico
```

#### Google Analytics

Fill in `google_analytics` property with your tracking ID.

```yaml
theme_config:
  google_analytics: your-tracking-id
```

#### Search

Search is active by default and at the moment cannot be deactivated (...you always need search for a good documentation site! :sunglasses:)

The implementation is based on [lunr](https://lunrjs.com/).

##### Front-matter

Search exposes the following properties usable in the [front-matter](https://hexo.io/docs/front-matter.html) block of markdown files:

* **search**:
  * possible values: `exclude|only|true`
  * default: `true`
  * example:
    
    ```markdown
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

### Lint

Lint the code using [ESLint](http://eslint.org/).

```
$ npm run lint
```

Run with `--fix` option to apply automatic fixes to code.

```
$ npm run lint -- --fix
```
