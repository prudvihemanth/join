const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Joi = require('@hapi/joi');


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });


    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: "1.0",
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route([{
        method: 'GET',
        path:'/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    },
    {
        method: 'GET',
        path: '/todo/{id}/',
        options: {
            handler: (request, h) => {

                return 'Hello World!';
            },
            description: 'Get todo',
            notes: 'Returns a todo item by the id passed in the path',
            tags: ['api'], // ADD THIS TAG
            validate: {
                params: {
                    id : Joi.number()
                            .required()
                            .description('the id for the todo item'),
                }
            }
        },
    }]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();