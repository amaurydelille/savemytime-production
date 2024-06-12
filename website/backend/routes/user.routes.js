const router = require('express').Router();
const User = require("../controllers/users.controllers");

router.post('/auth/signup', User.CreateUser);
router.post('/auth/', User.AuthUser);
router.get('/profile/:id', User.GetUser);

module.exports = router;