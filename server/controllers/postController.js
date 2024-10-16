const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4:uuid} = require('uuid')
const HttpError = require('../models/errorModel')
//=====create post
//post : api/posts
//PROTECTED
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;

    // Check if all fields and files are provided
    if (!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all fields and choose thumbnails", 422));
    }

    const { thumbnail } = req.files;

    // Check file size (2MB limit)
    if (thumbnail.size > 2000000) {
      return next(new HttpError("Thumbnail too big. File should be less than 2MB"));
    }

    // Rename the thumbnail file
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split('.');
    let newFilename = `${splittedFilename[0]}_${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

    // Move the thumbnail file to the uploads directory
    thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
      if (err) {
        return next(new HttpError(err));
      } else {
        // Create the new post
        const newPost = await Post.create({
          title,
          category,
          description,
          thumbnail: newFilename,
          creator: req.user.id
        });

        if (!newPost) {
          return next(new HttpError('Post could not be created', 422));
        }

        // Find the current user
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
          return next(new HttpError('User not found', 404));
        }

        // Manually increment the post count
        currentUser.posts = currentUser.posts + 1;
        await currentUser.save(); // Save the updated user document

        // Send the response with the created post
        res.status(201).json(newPost);
      }
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

//===== Get ALL Post
//get : api/posts
//UNPROTECTED
const getPosts = async(req, res, next) => {
   res.json("Get all  post")
}

//=====GET SINGLE POST
//post : api/posts/:id
//UNPROTECTED
const getPost = async(req, res, next) => {
   res.json("Get single Post")
}


//=====GET POSTS BY CATEGORY
//get : api/posts/categories/:category
//UNPROTECTED
const getCatPosts = async(req, res, next) => {
   res.json("get post by category")
}


//=====GET USER/AUTHOR POST
//get : api/posts/users/:id
//UNPROTECTED
const getUserPosts = async(req, res, next) => {
   res.json("Get user Posts")
}

//===== Edit post
//get : api/posts/:id
//PROTECTED
const editPost = async(req, res, next) => {
   res.json("Edit post")
}

//===== DELETE POST
//get : api/posts/:id
//PROTECTED
const deletePost = async(req, res, next) => {
   res.json("Delete Post")
}

module.exports = { createPost,getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost};

 