const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const tokenVerification = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', tokenVerification, feedController.getPosts);

router.post('/post', tokenVerification, [body('title').trim(), body('content').trim()], feedController.createPost);

module.exports = router;