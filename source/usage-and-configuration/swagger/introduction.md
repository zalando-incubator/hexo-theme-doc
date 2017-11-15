---
title: Swagger
---

# Swagger

The theme provides tools to read and parse swagger files as well as generate documentation from them.

## Tags
It provides following two tags which can grab the swagger schema from a local or remote location and create beautiful and easy to read documents.
* **[swagger_ui](./swagger-ui.html) -**  This tag generates [swagger ui](https://swagger.io/swagger-ui) from the swagger schema.
* **[swagger_to_html](./swagger-to-html.html) -**  This tag generates a simple and clean user interface that contains all the useful information present in the swagger specification with examples.


## Decorators
The theme also provides features to decorate/modify the swagger spec before using it.
A use case that can explain the rationale behind this feature is, sometime we might want to modify the swagger and remove some endpoints from being exposed in the documentation. 

Decorators provided by the theme:
## Excluding Definitions
You can add an `x-doc` object with `exclude: true` property to remove spec definitions/objects from being processed.
The flag can be added in the following places.
  * **Excluding path -** To remove a complete path from the spec add the `x-doc` object to that path.

    For instance, to remove `/pets` from the following sample schema.
    ```yaml
    swagger: "2.0"
    paths:
      /pets:
        x-doc:
          exclude: true
    ```
  * **Excluding operation -** To remove an operation from the spec you can add an `x-doc` object to that operation.

    For instance, to remove `get` operaton for the `/pet` path in the following sample schema.
    ```yaml
    swagger: "2.0"
    paths:
      /pets:
        get:
          x-doc:
            exclude: true
          description: "Returns all pets from the system that the user has access to"
    ```
  * **Excluding parameters -** To remove parameters, add an `x-doc` object to the parameter. If you add `x-doc` to a parameter definition, the parameter will be skipped from every place where it is referenced.

    Example -
    ```yaml
    swagger: 2.0""
    parameters:
      Authorization:
        name: Authorization
        in: header
        description: JWT token
        required: true
        x-doc:
          exclude: true
    /paths:
      /pets:
        summary: Retrives list of pets.
        parameters:
          - name: count
            in: query
            type: integer
            x-doc:
              exclude: true
    ```
  * **Excluding security definitions -** To remove any security definiton add an `x-doc` object to the definition and it will be removed from every place it is being used.

    Example -
    ```yaml
    swagger: "2.0"
    securityDefinitions:
      oauth:
        x-doc:
          exclude: true
        type: oauth2
        tokenUrl: https://auth.example.com/token
        flow: password
        scopes:
          read: Read access
          write: Write access
    ```
## Update host
There can be instances when you want to update the host in the swagger schema but just for the documentation purposes. 
You can do it by adding a `host` key in an `x-doc` object in the root of the document.
```yaml
swagger: "2.0"
host: "petstore.swagger.io"
basePath: "/api"
x-doc:
  host: "mysandbox.swagger.io"
```
