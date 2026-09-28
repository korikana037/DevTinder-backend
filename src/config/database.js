const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(
        'mongodb+srv://korikanasandeep1999_db_user:v3sBRtw21F24JCGP@first-cluster.vlh5zf8.mongodb.net/devTinder'
    );
};

module.exports = connectDb;