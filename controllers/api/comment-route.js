const router = require('express').Router();
const { Comment } = require('../../models');
const checkingLog = require('../../utils/checking');

router.get('/', (req, res) => {
    Comment.findAll({
    }).then(dbComment => res.json(dbComment)
    ).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', checkingLog, (req, res) => {
    if(req.session) {
        Comment.create({
            text: req.body.text,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id,
        }).then(dbComment => res.json(dbComment))
        .catch(err => {
            res.status(400).json(err);
        });
    }
});

router.delete('/:id', checkingLog, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbComment => {
        if(!dbComment) {
            res.status(400).json({ message: "No comment found with this ID."});
            return;
        }
        res.json(dbComment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;

