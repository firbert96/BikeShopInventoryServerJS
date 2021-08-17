const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const env = process.env.NODE_ENV;
const dbConnection = {
  development: process.env.DB_CONNECTION,
  test: process.env.DB_CONNECTION_TEST,
  staging: process.env.DB_CONNECTION,
  production: process.env.DB_CONNECTION
};
var mongoose = require('mongoose');
mongoose.connect(dbConnection[env], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => { console.log(`DB connect with ${dbConnection[env]}`) })
  .catch(() => { process.exit(1) });


if (env !== "test") {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const router = require('./models/router');
app.use('/api/v1', router);

app.get('/', (req, res) => res.status(200)
  .send({
    status: true,
    data: "Hello World!"
  })
)

module.exports = app