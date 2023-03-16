const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const checkingLog = require('../utils/checking');

router.get('/', checkingLog, (req, res) => {
    Blog.findAll({ 
        where: {
            user_id: req.session.user_id
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
        res.render('dashboard', {
            blogs,
            loggedIn: true
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/update/:id', checkingLog, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_on',
            'content'
        ],       include: [
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
        if(!dbBlogData) {
            res.status(404).json({ message: 'No Blog found with that Id'});
            return;
        }
        const blog = dbBlogData.get({ plain: true });
        res.render('update-blog', {
            blog,
            loggedIn: true
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.get('/create/', checkingLog, (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.params.user_id
        },
        attributes: [
            'id',
            'title',
            'created_on',
            'content'
        ],       include: [
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
        res.render('create-blog', {
            blogs,
            loggedIn: true
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;