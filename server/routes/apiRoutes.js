const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');

const userController = require('../controllers/userController.js');
const theftController = require('../controllers/theftController.js');

const Joi = BaseJoi.extend(Extension);

const routes = [
  {
    method: 'GET',
    path: '/getAllUsers',
    options: {
      handler: userController.getAllUsers,
      description: 'Get Users',
      notes: 'Returns all users who are police and bike owners',
      tags: ['api'],
      validate: { failAction: 'log' },
    },
  },

  {
    method: 'POST',
    path: '/createUser',
    options: {
      handler: userController.createUser,
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
      handler: theftController.reportCase,
      description: 'File Case',
      notes: 'Report a case of bike theft',
      tags: ['api'],
      validate: {
        payload: {
          ownerId: Joi.number().integer().min(1).max(9999999999999)
            .required()
            .description('Need Owner id'),
          title: Joi.string()
            .required()
            .description('Need Theft Title'),
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
      handler: theftController.bikeFound,
      description: 'Bike is found',
      notes: 'update the case to be found',
      tags: ['api'],
      validate: {
        payload: {
          policeId: Joi.number().integer().min(1).max(9999999999999)
            .required()
            .description('Need police id'),
          theftId: Joi.number().integer().min(1).max(9999999999999)
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
      handler: theftController.getAllCases,
      description: 'Get Active Cses',
      notes: 'Returns all cases which are under inspection',
      tags: ['api'],
      validate: {},
    },
  },
];

module.exports = routes;
