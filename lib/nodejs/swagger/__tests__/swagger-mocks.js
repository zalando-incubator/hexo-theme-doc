'use strict';

const referencedSchema = {
  'swagger': '2.0',
  'parameters': {
    'Auth': {
      'name': 'Auth'
    }
  },
  'paths': {
    '/pets': {
      'get': {
        'parameters': [
          {
            '$ref': '#/parameters/Auth'
          },
          {
            'name': 'param1'
          }
        ],
        'responses': {
          'default': {
            'schema': {
              '$ref': '#/definitions/Response'
            }
          }
        }
      }
    }
  },
  'definitions': {
    'Response': {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string'
        }
      }
    }
  }
};

const dereferencedSchema = {
  'swagger': '2.0',
  'parameters': {
    'Auth': {
      'name': 'Auth'
    }
  },
  'paths': {
    '/pets': {
      'get': {
        'parameters': [
          {
            'name': 'Auth'
          },
          {
            'name': 'param1'
          }
        ],
        'responses': {
          'default': {
            'schema': {
              'type': 'object',
              'properties': {
                'name': {
                  'type': 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  'definitions': {
    'Response': {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string'
        }
      }
    }
  }
};

const mergedSchema = {
  'swagger': '2.0',
  'parameters': {
    'Auth': {
      'name': 'Auth'
    }
  },
  'paths': {
    '/pets': {
      'get': {
        'parameters': [
          {
            '$ref': '#/parameters/Auth',
            'name': 'Auth'
          },
          {
            'name': 'param1'
          }
        ],
        'responses': {
          'default': {
            'schema': {
              '$ref': '#/definitions/Response',
              'type': 'object',
              'properties': {
                'name': {
                  'type': 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  'definitions': {
    'Response': {
      'type': 'object',
      'properties': {
        'name': {
          'type': 'string'
        }
      }
    }
  }
};

module.exports = {
  referencedSchema,
  dereferencedSchema,
  mergedSchema
};
