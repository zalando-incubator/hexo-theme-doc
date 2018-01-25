---
title: SASS styles
---

# SASS styles

We used [SASS](http://sass-lang.com/) to write styles for the theme.
This can be helpful when style customization is required.

## How To Customize Styles with SASS

Install `hexo-renderer-sass` in your project:

```
$ npm install hexo-renderer-sass --save
```

Update your configuration and add:

```yaml
node_sass:
  includePaths:
   - node_modules
```

Create the entry point for custom styles at `source/styles/doc.scss` and import the theme core styles:

```scss
@import "hexo-theme-doc/_doc.scss"
```
> The entry point location **must be** `source/styles/doc.scss` so that it will override the css pre-compiled version that theme tries to include by default.

To **override variables** you should declare them before including theme core styles, example:

```scss

$doc-color-primary: red; // set primary color to "red"

@import "hexo-theme-doc/_doc.scss"
```

> To see the list of available variables, have a look to `hexo-theme-doc/source/style/_doc/vars.scss` file.
