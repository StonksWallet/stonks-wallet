const mongoose = require('mongoose');
const config = require('./index.js');

module.exports = () => {
    let DB_URL;

    if(config.app.node_env === "prod") {
        DB_URL = config.db.production;
    } else {
        DB_URL = config.db.develop;
    }

    mongoose.set('useFindAndModify', false);

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log("Database connection error: " + err);
    });

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    });
}
