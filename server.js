const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection')
const exphds = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
