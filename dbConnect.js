const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI || process.env.MONGO_DB

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then(
    () => {
        console.log('======= yeehaw! connected to mongo =======');
    },
    err => {
        console.log('======= error connecting to mongo:');
        console.log(err)
        }
);
    
module.exports = mongoose.connection;