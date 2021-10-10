require('dotenv').config();
const mongoose = require('mongoose');
async function connect(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learn.sdvlh.mongodb.net/mern-learn?retryWrites=true&w=majority`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Connect to DB Success');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
module.exports = {connect};