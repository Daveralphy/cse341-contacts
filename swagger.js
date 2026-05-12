import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My Nigerian Contacts API',
    description: 'Contacts API for CSE 341',
  },
  host: 'cse341-contacts-unhb.onrender.com', 
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);