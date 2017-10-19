---
title: Writing
---

# Writing

## Pages

To add pages to your documentation website, simply create new `markdown` files in your `source` folder, eg:

*source/lorem-ipsum.md*
```
---
title: Lorem Ipsum
---

# Lorem Ipsum

Lorem ipsum
```

Assuming that your website root is running at http://localhost:4000, the page will be available at http://localhost:4000/lorem-ipsum.html.

## Using Tags

In addition to markdown standard markup, Hexo uses special **tags** to add specific content into your pages, eg:

*source/lorem-ipsum.md*
```markdown
{% youtube video_id %}
```

The tag `youtube` will include a youtube player in your page.

There are many [built-in](https://hexo.io/docs/tag-plugins.html) tags and more can be installed.
