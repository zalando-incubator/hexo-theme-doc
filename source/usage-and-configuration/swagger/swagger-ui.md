---
title: Swagger UI
---

# Swagger UI

## Usage

To include [swagger ui](https://swagger.io/swagger-ui/) javascript interface in a page you can use the `swagger_ui` or `swagger_ui_advanced` tags, eg:

```md
---
title: Petstore Api Reference
---

{% swagger_ui <swagger path> %}

or

{% swagger_ui_advanced <swagger path> %}
<options>
{% endswagger_ui_advanced }
```

> The location of swagger file (`<swagger_path>`) can be a local file path or a URL.

> Use `swagger_ui_advanced` when you want to pass configuration options that will override the global configuration (see [Configuration](./#configuration)).   
The `<options>` value **must be** a **valid JSON**.

**Examples**

With a local path:
```md
{% swagger_ui ./petstore.yaml %}
```

With a URL:
```md
{% swagger_ui  https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore.json %}
```

With options:

```md
{% swagger_ui_advanced ./petstore.yaml %}
{
  "version": 3,
  "api_explorer": false
}
{% endswagger_ui_advanced }
```

## Configuration

Adjust swagger-ui behavior by updating your `_config.yml`, below all the default values:

```yaml
theme_config:
  swagger_ui:
    version: 2 # choose which swagger-ui version will be used: 2 or 3

    # version 2 specific options
    permalinks: true   # allows having a URL direct access to a group of operations or to an operation and making it unfolded at startup
    api_explorer: true # display or not API explorer functionalities (try out, authenticate, etc.)
    download: Download specification

    # version 3 specific options
    show_extensions: false
    deep_linking: true
    display_operation_id: false
    doc_expansion: 'none'
```

> Be aware that "permalinks" will work as expected if the specification's operations are defining the `operationId` key  

## Demo v2

{% swagger_ui ./petstore.yaml  %}

## Demo v3

{% swagger_ui_advanced ./petstore.yaml %}
{
  "version": 3,
  "doc_expansion": "list"
}
{% endswagger_ui_advanced %}
