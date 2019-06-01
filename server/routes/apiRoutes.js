const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const Joi = BaseJoi.extend(Extension);

const routes = [
  {
    method: 'GET',
    path: '/getAllUsers',
    options: {
      handler: () => ({ id: 100 }),
      description: 'Get Users',
      notes: 'Returns all users who are police and bike owners',
      tags: ['api'],
      validate: {},
    },
  },

  {
    method: 'POST',
    path: '/createUser',
    options: {
      handler: (request, h) => h.response({ id: request.params.id }),
      description: 'Create User',
      notes: 'Create a user who can be police or bike_owner',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string()
            .required()
            .description('Need User name'),
          email: Joi.string().email()
            .required()
            .description('Need User email'),
          role: Joi.string().valid('police', 'owner')
            .required()
            .description('Need User role, should be strictly police or owner'),
        },
      },
    },
  },

  {
    method: 'POST',
    path: '/reportCase',
    options: {
      handler: (request, h) => h.response({ id: 200 }),
      description: 'File Case',
      notes: 'Report a case of bike theft',
      tags: ['api'],
      validate: {
        payload: {
          id: Joi.string()
            .required()
            .description('Need User id'),
          description: Joi.string()
            .required()
            .description('Need Theft Description'),
          location: Joi.string()
            .required()
            .description('Need Theft Location'),
          reportedDate: Joi.date().format('YYYY-MM-DD')
            .required()
            .description('Need Reported Date'),
          theftDate: Joi.date().format('YYYY-MM-DD')
            .required()
            .description('Need Theft Date'),
        },
      },
    },
  },

  {
    method: 'PUT',
    path: '/bikeFound',
    options: {
      handler: (request, h) => h.response({ id: 200 }),
      description: 'Bike is found',
      notes: 'update the case to be found',
      tags: ['api'],
      validate: {
        payload: {
          userId: Joi.string()
            .required()
            .description('Need User id'),
          theftId: Joi.string()
            .required()
            .description('Need Theft id'),
        },
      },
    },
  },

  {
    method: 'GET',
    path: '/getAllCases',
    options: {
      handler: () => ({ id: 100 }),
      description: 'Get Active Cses',
      notes: 'Returns all cases which are under inspection',
      tags: ['api'],
      validate: {},
    },
  },
];

module.exports = routes;
