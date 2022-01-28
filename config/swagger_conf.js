const options = {
    swaggerDefinition: {
        info: {
            description: 'ioGrocery API for ESMAPP project',
            title: 'ioGrocery API',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http']/* ,
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        } */

    },
    basedir: __dirname,
    files: ['../routes/**/*.js', '../models/**/*.js']
};

module.exports = options;