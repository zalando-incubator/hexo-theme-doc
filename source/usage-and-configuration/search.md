---
title: Search
---

# Search

Search is active by default and at the moment **can't be deactivated**.   
...you always need search for a good documentation site! 😎

The implementation is based on [lunr](https://lunrjs.com/).

## Front-matter

Search can be customized on a per-page basis using [front-matter](https://hexo.io/docs/front-matter.html) You only need to create a yaml block in your markdown file.

### search
  * possible values: `exclude|only|true`
  * default: `true`
  * example:

    ```markdown
    ---
    title: My Page
    search: exclude
    ---

    # My Page

    This page will be excluded from the search index
    ...
    ```
