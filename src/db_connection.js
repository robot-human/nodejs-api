const { MONGODB_URI } = require('./config');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

(async () => {
    try {
        const db = mongoose.connect(MONGODB_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log(`connected succesfully to: ${MONGODB_URI}`);
    } catch (error) {
        console.error(error);
    }
})();
mongoose.Promise = global.Promise;