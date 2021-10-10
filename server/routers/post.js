const express= require('express');
const router=express.Router();
const PostController=require('../controllers/PostController');
const verifyToken=require('../middleware/auth');

// @route GET api/posts
// @description get posts
// @access Private

router.get('/',verifyToken,PostController.getPosts)

// @route POST api/posts
// @description create post
// @access Private

router.post('/',verifyToken,PostController.create);

// @route PUT api/posts
// @description PUT posts
// @access Private

router.put('/:id',verifyToken,PostController.update)

// @route DELETE api/posts
// @description DELETE posts
// @access Private
router.delete('/:id',verifyToken,PostController.delete)

module.exports=router;