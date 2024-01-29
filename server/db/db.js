const Mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await Mongoose.connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,        
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
