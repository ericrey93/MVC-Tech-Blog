const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection')
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({ helpers });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Superbigsecret',
    cookie: {
        expires: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(express.json());
app.use(session(sess));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

