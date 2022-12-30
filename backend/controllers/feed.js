const { validationResult } = require('express-validator');
const post = require('../models/post');
const user = require('../models/user');
const mongoose = require('mongoose');
const io = require('../socket');

exports.getPosts = async (req, res, next) => {
  try {
    const getPosts = await post.find();
    if (getPosts) res.status(200).json({
      message: 'Fetched posts successfully',
      posts: getPosts,
    });
  } catch (err) {
    err.statusCode = 422;
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    console.log(req.file)

    if (!req.file) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.file.path.replace("\\", "/");

    const userId = req.userId;

    const getUser = await user.findOne({ _id: userId });
    const createPost = await post({ title: title, description: description, imageUrl: imageUrl, creator: { _id: mongoose.Types.ObjectId(userId), name: getUser.name } }).save();
    getUser.post.push(createPost._id);
    getUser.save();
    if (createPost && getUser) {
      io.getIO().emit('posts', { action: "Create", post: createPost });
      return res.status(201).json({
        message: 'Post created successfully!',
        post: createPost
      })
    };
  } catch (err) {
    next(err);
  }
};