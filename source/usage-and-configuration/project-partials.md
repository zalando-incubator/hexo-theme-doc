---
title: Project Partials
---

# Project Partials

With project partials functionality you will be able to include [ejs](http://ejs.co/) templates inside the layout.<br>
This can be especially useful when you want to include extra stylesheets/javascript, add meta tags in the head, and so on.

There are 4 areas of the layout where you can include your partials:

* **head_start**
* **head_end**
* **footer_start**
* **footer_end**


<br>
To include partials templates, update the configuration. An example:

```yaml
theme_config:
  partials:
    head_start:
      - ./meta.ejs
      - ./stylesheets.ejs
    footer_end: ./scripts.ejs
```

> Layout [variables](https://hexo.io/docs/variables.html) and [helpers](https://hexo.io/docs/helpers.html) are available in all defined templates.
