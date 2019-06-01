const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
require('dotenv').config();


const routes = require('./server/routes/apiRoutes.js');
const logger = require('./server/utils/utils.js');

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
  });


  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '1.0',
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.route(routes);
  await server.start();
  logger.info(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

init();
