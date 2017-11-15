---
title: Swagger to HTML
---

# Swagger to HTML (beta)

## Usage

To **generate html output** from an open api specification you can use the `swagger_to_html` tag, eg:

```md
---
title: Petstore Api Reference
---

{% swagger_to_html <swagger_path> %}
```
>The location of swagger file (`<swagger_path>`) can be a local file path or a URL.

**Examples**

With a local path:
```md
{% swagger_to_html ./petstore.yaml %}
```
With a URL:
```md
{% swagger_to_html  https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore.json %}
```

## Demo

{% swagger_to_html ./petstore.yaml %}
