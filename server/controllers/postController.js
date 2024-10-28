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
    let newFilename = splittedFilename[0] + uuid() + "." +splittedFilename[splittedFilename.length -1]
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

        //find user and increate post count by 1
        const currentUser = await User.findById(req.user.id);
        const userPostCount = currentUser.posts + 1;
        await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

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
   try {
        const posts = await Post.find().sort({updateAt: -1})
        res.status(200).json(posts)
   } catch (error) {
    return next(new HttpError(error))
    
   }
}

//=====GET SINGLE POST
//post : api/posts/:id
//UNPROTECTED
const getPost = async(req, res, next) => {
   try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if(!post){
        return next(new HttpError('Post not found.', 404))
      }
      res.status(200).json(post)
    
   } catch (error) {
     return next(new HttpError(error))
   }
}


//=====GET POSTS BY CATEGORY
//get : api/posts/categories/:category
//UNPROTECTED
const getCatPosts = async(req, res, next) => {
   try {
      const { category } = req.params;
      const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
      res.status(200).json(catPosts);

   } catch (error) {
      return next(new HttpError(error))
   }
}


//=====GET USER/AUTHOR POST
//get : api/posts/users/:id
//UNPROTECTED
const getUserPosts = async(req, res, next) => {
    try {
         const {id} = req.params;
         const posts = await Post.find({creator: id}) .sort({createdAt: -1})
         res.status(200).json(posts)
    } catch (error) {
      
    }
}
//=====Edit USER/AUTHOR POST
//get : api/posts/users/:id
//UNPROTECTED
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let { title, category, description } = req.body;
    
    // Get the post from the database
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    // Check if the current user is the creator of the post
    if (req.user.id != post.creator.toString()) {
      return next(new HttpError("Not authorized to edit this post", 403));
    }

    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields", 422));
    }
    
    let updatePost;
    
    if (!req.files) {
      updatePost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
    } else {

      try {
        await fs.promises.unlink(path.join(__dirname, '..', 'uploads', post.thumbnail));
      } catch (err) {
        console.error("Error deleting old thumbnail:", err);
        // Continue with update even if old file deletion fails
      }
      
      // Upload new thumbnail
      const { thumbnail } = req.files;
      
      // Check file size
      if (thumbnail.size > 2000000) {
        return next(new HttpError('Thumbnail too big. Should be less than 2mb'));
      }
      
      const fileName = thumbnail.name;
      const splittedFilename = fileName.split('.');
      const newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
      
      try {
        await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));
      } catch (err) {
        return next(new HttpError("Error uploading new thumbnail", 500));
      }
      
      updatePost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });
    }
    
    if (!updatePost) {
      return next(new HttpError("Couldn't update post", 400));
    }
    
    res.status(200).json(updatePost);
  } catch (error) {
    return next(new HttpError(error.message || "Server error", 500));
  }
};
//===== DELETE POST
//get : api/posts/:id
//PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }

    // Check if the current user is the creator of the post
    if (req.user.id !== post.creator.toString()) {
      return next(new HttpError("Not authorized to delete this post", 403));
    }

    const fileName = post.thumbnail;

    try {
      // Delete thumbnail from uploads folder
      await fs.promises.unlink(path.join(__dirname, '..', 'uploads', fileName));
    } catch (err) {
      console.error("Error deleting file:", err);
      // Continue with post deletion even if file deletion fails
    }

    try {
      await Post.findByIdAndDelete(postId);

      // Find user and reduce post count by 1
      const currentUser = await User.findById(req.user.id);
      if (currentUser) {
        const userPostCount = Math.max(0, currentUser.posts - 1);
        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
      }

      res.json(`Post ${postId} deleted successfully`);
    } catch (error) {
      return next(new HttpError("Error deleting post or updating user", 500));
    }
  } catch (error) {
    return next(new HttpError("Server error", 500));
  }
};

module.exports = { createPost,getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost};

 