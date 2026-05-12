import express from 'express';
import bodyParser from 'body-parser';
import mongodb from './db/connect.js';
import contactRoutes from './routes/contacts.js';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

app
  .use(express.json())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Swagger Route
  .use('/contacts', contactRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});