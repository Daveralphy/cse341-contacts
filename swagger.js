import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My Nigerian Contacts API',
    description: 'Contacts API for CSE 341',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

// generate swagger.json
swaggerAutogen()(outputFile, endpointsFiles, doc);