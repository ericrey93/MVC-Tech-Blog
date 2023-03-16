const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const checkingLog = require('../../utils/checking');

router.get('/', (req, res) => {
    User.findAll({
        include: [Blog, Comment]
    }).then(dbUser => res.json(dbUser))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }, include: [{
            model:Blog,
            attributes: ['id', 'title', 'content', 'created_on']
        }, {
            model: Comment,
            attributes: ['id', 'text', 'created_on'],
            include: {
                model: Blog,
                attributes: ['title']
            }
        }]
    }).then(dbUser => {
        if(!dbUser) {
            res.status(404).json({ message: 'No user found with this ID.'});
            return;
        }
        res.json(dbUser);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/login', (res, req) => {
    User.findOne({
        where: {
          username: req.body.username
        }
      }).then(dbUser => {
        if (!dbUser) {
          res.status(400).json({ message: 'No user with that username address!' });
          return;
        }
    
        const passwordCheck = dbUser.checkPassword(req.body.password);
    
        if (!passwordCheck) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }
    
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          res.json({ message: 'You are logged in' });
        });
      });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(200).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

  router.put('/:id', checkingLog, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUser => {
        if (!dbUser[0]) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', checkingLog, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;