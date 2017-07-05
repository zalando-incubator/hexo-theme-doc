## Lunr Hexo Integration

This module add the ability to generate a [lunr](https://lunrjs.com/) search index to handle client-side search.

## Usage

### Frontmatter Options

* **search** <string> (exclude|only|true) default: true

### FAQ

- **How to exclude a page from search?**

Use `search: exclude` in you frontmatter options, eg:

```md
---
search: exclude
title: My Page
---

# My Page

...
```
