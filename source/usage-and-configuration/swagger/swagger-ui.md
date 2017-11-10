---
title: Swagger UI
---

# Swagger UI

## Usage

To include [swagger ui](https://swagger.io/swagger-ui/) javascript interface in a page you can use the `swagger_ui` tag, eg:

```md
---
title: Petstore Api Reference
---

{% swagger_ui <swagger path> %}
```
>The location of swagger file (`<swagger_path>`) can be a local file path or a URL.

**Examples**

With a local path:
```md
{% swagger_ui ./petstore.yaml %}
```
With a URL:
```md
{% swagger_ui  https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore.json %}
```

## Configuration

Adjust swagger-ui behaviour by updating your `_config.yml`:

```yaml
theme_config:
  swagger_ui:
    api_explorer: true # display or not API explorer, default is true
    permalinks: true   # allows having a URL direct access to a group of operations or to an operation and making it unfolded at startup
```

> Be aware that "permalinks" will work as expected if the specification's operations are defining the `operationId` key  

## Demo

{% swagger_ui ./petstore.yaml %}
