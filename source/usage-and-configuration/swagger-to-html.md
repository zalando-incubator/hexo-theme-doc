---
title: Swagger to HTML
---

# Swagger to HTML

## Usage

To **generate html output** from an open api specification you can use the `swagger_to_html` tag, eg:

```md
---
title: Petstore Api Reference
---

{% swagger_to_html ./petstore.yaml %}
```

*Note: This feature is in beta phase.*

## Demo

{% swagger_to_html ./petstore.yaml %}
