const { Router } = require('express');
const {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// Create a post (protected route)
router.post('/', authMiddleware, createPost);

// Get all posts
router.get('/', getPosts);

// Get a specific post by ID single post
router.get('/:id', getPost);

// Edit a post by ID (protected route)
router.patch('/:id', authMiddleware, editPost);

// Get posts by category
router.get('/categories/:category', getCatPosts);

// Get posts by a specific user ID
router.get('/users/:id', getUserPosts);

// Delete a post by ID (protected route)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
