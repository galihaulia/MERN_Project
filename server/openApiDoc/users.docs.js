const util1 = require('../utils/apiBuildHandler')
const moment = require('moment')
const tag = 'UserController'
const schema = {
  usersSchema: {
    title: 'Get All Users',
    type: 'object',
    properties: {
      sumOfUser: {
        type: 'integer',
      },
      users: {
        type: 'array',
        items: {
          properties: {
            id: {
              type: 'integer',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  userSchema: {
    title: 'Get User',
    properties: {
      id: {
        type: 'integer',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
  },
}
const paths = {
  '/users': {
    get: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Get All Users',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'usersSchema',
                'usersSchema',
                'object',
              ),
            },
          },
        },
      },
    },
  },
  '/user': {
    get: {
      tags: [tag],
      parameters: [
        {
          name: 'user_id',
          in: 'query',
          schema: {
            type: 'string',
          },
          required: false,
        },
      ],
      responses: {
        200: {
          description: 'Get User',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'userSchema',
                'userSchema',
                'object',
              ),
            },
          },
        },
      },
    },
    // post: {
    //     tags: [tag],
    //     requestBody: {
    //         content: {
    //             "application/json":{
    //                 schema: util1.getSchemaRequest("userCreation")
    //             }
    //         }
    //     },
    //     responses: {
    //         200 : {
    //             description: "User Creation",
    //             content: {
    //                 "application/json":{
    //                     schema: {
    //                         properties: {
    //                             message: {
    //                                 type: "string"
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },
    // put: {
    //     tags: [tag],
    //     requestBody: {
    //         content: {
    //             "application/json":{
    //                 schema: util1.getSchemaRequest("userModification")
    //             }
    //         }
    //     },
    //     responses: {
    //         200 : {
    //             description: "User Modification",
    //             content: {
    //                 "application/json":{
    //                     schema: {
    //                         properties: {
    //                             message: {
    //                                 type: "string"
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // },
    // delete: {
    //     tags: [tag],
    //     requestBody: {
    //         content: {
    //             "application/json":{
    //                 schema: util1.getSchemaRequest("userDeletion")
    //             }
    //         }
    //     },
    //     responses: {
    //         200 : {
    //             description: "User Deletion",
    //             content: {
    //                 "application/json":{
    //                     schema: {
    //                         properties: {
    //                             message: {
    //                                 type: "string"
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
  },
}

exports.default = { schema, paths }
