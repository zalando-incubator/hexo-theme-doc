'use strict';

const body = {
  'name':'foo',
  'in':'body',
  'description':'This is foo.',
  'required':true,
  'schema':{
    'type':'object',
    'description':'Representation of foo',
    'properties':{
      'data':{
        'type':'object',
        'description':'Foo Resource Object',
        'properties':{
          'id':{
            'description':'Identifier of resource',
            'type':'string'
          },
          'attributes':{
            'type':'object',
            'description':'The representation of foo.',
            'required':[
              'foo_required'
            ],
            'properties':{
              'foo_easy':{
                'description':'The easy going foo',
                'type':'string',
                'example':'exampleEasyFoo'
              },
              'foo_required':{
                'description':'The important foo.',
                'type':'string',
                'example':'exampleFooImportant'
              }
            }
          }
        }
      },
      'arrayData': {
        'type': 'array',
        'items': {
          'type': 'object',
          'description': 'Array object',
          'required': [
            'type'
          ],
          'properties': {
            'type': {
              'description': 'Type of resource',
              'type': 'string'
            }
          }
        }
      },
      'enumData': {
        'description': 'This is an enum',
        'enum': [
          'option1',
          'option2'
        ]
      }
    }
  }
};

const responseWithoutData = {
  'description':'Data was created.',
  'headers':{
    'Location':{
      'description':'The location.',
      'type':'string',
      'format':'url'
    }
  }
};

const responseWithData = {
  'description':'Returns the list.',
  'schema':{
    'type':'object',
    'description':'top level object to hold the list',
    'required':[
      'foo'
    ],
    'properties':{
      'foo':{
        'type':'array',
        'items':{
          'type':'object',
          'description':'Representation of foo',
          'required':[
            'bar'
          ],
          'properties':{
            'bar':{
              'type':'string',
              'description':'bar',
              'example':'Bar-Bar'
            },
            'baz':{
              'type':'integer',
              'description':'baz',
              'example':30
            }
          }
        }
      },
      'data': {
        'type': 'object',
        'additionalProperties': {
          'type': 'object',
          'description': 'Description',
          'required': [
            'id'
          ],
          'properties': {
            'id': {
              'description': 'Identifier of resource',
              'type': 'string'
            }
          }
        }
      }

    }
  }
};

module.exports = {
  body,
  responseWithoutData,
  responseWithData
};
