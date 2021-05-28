const util1 = require('../utils/apiBuildHandler')
const moment = require('moment')
const tag = 'EventsController'
const schema = {
  eventsSchema: {
    title: 'Get All Events',
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
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            image: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  eventSchema: {
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
  createEventSchema: {
    title: 'Create Event',
    properties: {
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      image: {
        type: 'string',
      },
    },
  },
}
const paths = {
  '/events': {
    get: {
      tags: [tag],
      parameters: [],
      responses: {
        200: {
          description: 'Get All Events',
          content: {
            'application/json': {
              schema: util1.getSchemaResponse(
                'eventsSchema',
                'eventsSchema',
                'object',
              ),
            },
          },
        },
      },
    },
  },
  '/event': {
    // get: {
    //   tags: [tag],
    //   parameters: [
    //     {
    //       name: 'user_id',
    //       in: 'query',
    //       schema: {
    //         type: 'string',
    //       },
    //       required: true,
    //     },
    //   ],
    //   responses: {
    //     200: {
    //       description: 'Get User',
    //       content: {
    //         'application/json': {
    //           schema: util1.getSchemaResponse(
    //             'userSchema',
    //             'userSchema',
    //             'object',
    //           ),
    //         },
    //       },
    //     },
    //   },
    // },
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'application/json': {
            schema: util1.getSchemaRequest('createEventSchema'),
          },
        },
      },
      responses: {
        200: {
          description: 'Create Event',
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
  '/event/image': {
    post: {
      tags: [tag],
      requestBody: {
        content: {
          'multipart/form-data': {
            type: 'object',
            schema: {
              properties: {
                image: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Upload event image',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                  },
                  url: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    // delete : {
    //     tags : [tag],
    //     requestBody: {
    //         content: {
    //             "application/json":{
    //                 schema: {
    //                     properties: {
    //                         url: {
    //                             type: "string"
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     responses : {
    //         200 : {
    //             description : "Delete profile image",
    //             content: {
    //                 "application/json" : {
    //                     schema: {
    //                         properties: {
    //                             message: {
    //                                 type: "string",
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
