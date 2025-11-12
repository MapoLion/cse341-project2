const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Book Api',
        description: 'Book Api'
    },
    host: 'localhost:3001',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);