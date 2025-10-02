require('dotenv').config()
const mongoose = require('mongoose');

const dbConfig = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

module.exports = dbConfig;