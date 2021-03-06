const util1 = require('../utils/apiBuildHandler')
const moment = require('moment')
const tag = 'AuthController'
const schema = {
  registration: {
    title: 'User Creation',
    properties: {
      first_name: {
        type: 'string',
      },
      last_name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  login: {
    title: 'User Login',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
}
const paths = {
  '/register': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('registration'),
          },
        },
      },
      responses: {
        200: {
          description: 'User Creation',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/login': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('login'),
          },
        },
      },
      responses: {
        200: {
          description: 'Login User',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

exports.default = { schema, paths }
