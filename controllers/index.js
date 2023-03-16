const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./home.js');
const dashboardRoute = require('./dashboard.js');

router.use('/api', apiRoute);
router.use('/', homeRoute);
router.use('/dashboard', dashboardRoute);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;