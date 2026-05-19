import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My Nigerian Contacts & Projects API',
    description: 'Contacts and Projects API for CSE 341 - Performs CRUD operations on MongoDB',
    version: '1.0.0',
  },
  host: 'cse341-contacts-unhb.onrender.com', 
  schemes: ['https', 'http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWT Authorization header using the Bearer scheme',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);