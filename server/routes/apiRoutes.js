const Joi = require('@hapi/joi');

const routes = [
  {
    method: 'GET',
    path: '/todo/{id}/',
    options: {
      handler: (request, h) => 'Hello World!',
      description: 'Get todo',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG
      validate: {
        params: {
          id: Joi.number()
            .required()
            .description('the id for the todo item'),
        },
      },
    },
  }];

module.exports = routes;
