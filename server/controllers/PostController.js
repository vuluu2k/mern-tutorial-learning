const Post = require('../models/Post');

class PostController {
    // [POST] api/posts
    async create(req, res) {
        const { title, description, url, status } = req.body;
        if (!title)
            return res.status(400).json({ success: false, message: 'Title is required' });
        try {
            const newPost = new Post({
                title,
                description,
                url: (url.startsWith('https://') ? url : `https://${url}`),
                status: status || 'TO LEARN',
                user: req.userId,
            })
            await newPost.save();
            res.json({ success: true, message: 'Happy learning!', post: newPost });
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
    // [GET] api/posts
    async getPosts(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
            res.json({ success: true, posts });
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
    // [PUT] api/posts/:id
    async update(req, res) {
        const { title, description, url, status } = req.body;
        if (!title)
            return res.status(400).json({ success: false, message: 'Title is required' });
        try {
            let updatedPost = {
                title,
                description:description||'',
                url: (url.startsWith('https://') ? url : `https://${url}`)||'',
                status: status || 'TO LEARN',
            }
            const postUpdateCondition={_id:req.params.id,user: req.userId}
            updatedPost=await Post.findOneAndUpdate(postUpdateCondition,updatedPost,{new:true});
            if(!updatedPost)
                return res.status(401).json({ success:false,message:'Post not found or user not authorised'})
            res.json({success:true,message:'Excellent progress!',post:updatedPost})
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
    // [DELETE] api/posts/:id
    async delete(req,res){
        try {
            const postDeleteCondition={_id:req.params.id,user:req.userId};
            const deletePost=await Post.findOneAndDelete(postDeleteCondition);
            if(!deletePost)
                return res.status(401).json({ success:false,message:'Post not found or user not authorised'})
            res.json({success:true,message:'Deleted Success!',post:deletePost})
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}
module.exports = new PostController();
