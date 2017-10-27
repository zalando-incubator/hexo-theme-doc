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

{% swagger_ui ./petstore.yaml %}
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
