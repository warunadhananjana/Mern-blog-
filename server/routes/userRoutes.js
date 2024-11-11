const { Router } = require('express');
const {
	registerUser,
	loginUser,
	getUser,
	changeAvatar,
	editUser,
	getAuthors,
} = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/authors', getAuthors); // This route handles getting authors
router.get('/:id', getUser); // This route handles getting a user by ID
router.post('/change-avatar', authMiddleware, changeAvatar);
router.patch('/edit-user', authMiddleware, editUser);

// Optional: Uncomment if you want a root route for testing
// router.get('/', (req, res, next) => {
//     res.json('This is the user route');
// });

module.exports = router;
