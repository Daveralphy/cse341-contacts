const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect'); // Import the database logic

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/contacts', require('./routes/contacts'));

// Initialize DB connection before starting the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});