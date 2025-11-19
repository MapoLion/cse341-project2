const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books & Videos API',
        description: 'API for managing books and video media'
    },
    host: 'cse341-project2-books.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);