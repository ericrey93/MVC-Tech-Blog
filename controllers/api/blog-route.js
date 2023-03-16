const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const checkingLog = require('../../utils/checking');


router.get('/', (req, res) => {
    Blog.findAll({
        attributes:[
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
        res.json(dbBlogData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_on',
            'content'
        ],        include: [
            {
                model: Comment,
                attributes: ['id', 'user_id', 'blog_id', 'text', 'created_on'],

                    model: User,
                    attributes: ['username'],
           include: {
            model: User,
            attributes: ['username']
           } 
        }
        ]
    }).then(dbBlogData => {
        if(!dbBlogData) {
            res.status(404).json({ message: 'No Blog found with that Id'});
            return;
        } res.json(dbBlogData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', checkingLog, (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }).then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        res.status(500).json(err)
    });
});

router.put('/:id', checkingLog, (req, res) => {
    Blog.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbBlogData => {
        if(!dbBlogData) {
            res.status(404).json({ message: 'No blog found with this ID.'});
            return;
        }
        res.json(dbBlogData);
    }).catch(err => {
        res.status(500).json(err)
    });
});

router.delete('/:id', checkingLog, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbBlogData => {
        if(!dbBlogData) {
            res.status(404).json({ message: 'No blog with this id found.'});
            return;
        }
        res.json(dbBlogData);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router