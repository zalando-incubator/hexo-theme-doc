---
title: Support
---

# Support

With the "support feature" you can control how documentation consumers will get in touch with you if they need support or they want to share their feedback.

When active, a "footer" will be showed on every page and, optionally, a special [navigation](./navigation.html) entry will be added to the menu.

## Configuration

To activate the feature, update your `_config.yml`:

```yaml

theme_config:
  support:
    link_url: 'mailto:your.contact@email.com',
    text: 'Didn\'t you find what are you looking for? <br> Try searching again on the left menu or', # default
    link_text: 'Contact Us', # default
    navigation: true, # default
    navigation_label: 'SUPPORT' # default
```

## Front-matter

You can activate/deactivate the support feature on a per page basis with:

```markdown
---
title: My Page
support: false
---
```
