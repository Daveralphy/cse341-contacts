const dotenv = require('dotenv');
dotenv.config(); // This loads the local .env file when you are on your computer

const MongoClient = require('mongodb').MongoClient;

// These lines will now grab from your local .env OR from Render's dashboard
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const url = process.env.DB_URL;

// This builds the connection string using whatever variables are found
const uri = `mongodb+srv://${user}:${pass}@${url}/`;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  
  // If uri is undefined, it means the variables above didn't load
  if (!user || !pass || !url) {
    return callback(new Error("Environment variables are missing. Check Render Config Vars."));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};