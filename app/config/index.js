const config = {
    app: {
        port: process.env.PORT || 3001,
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/contactbook',
    },
};

module.exports = config;
