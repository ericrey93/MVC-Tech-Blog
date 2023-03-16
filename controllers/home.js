const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'created_on',
            'content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'blog_id', 'text', 'created_on'],
                include: {
                    model: User,
                    attributes: ['username'],
                }
            },
             {
                model: User,
                attributes: ['username'],
            }
        ]
    }).then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id, 
        },
        attributes: [
            'id',
            'title',
            'created_on',
            'content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'blog_id', 'text', 'created_on'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }, {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbBlogData => {
        if(!dbBlogData) {
            res.status(404).json({ message: 'No Blog found with that Id'});
            return;
        }
        const blog = dbBlogData.get({ plain: true });
        res.render('one-blog', {
            blog,
            loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;