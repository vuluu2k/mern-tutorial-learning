const authRouter= require('./auth');
const postRouter= require('./post');


function route(app){
    app.use('/api/posts',postRouter);
    app.use('/api/auth',authRouter);
}
module.exports = route;