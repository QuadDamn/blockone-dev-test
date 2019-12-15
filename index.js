const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use('/api', require('./src/api'));

// The server listener gets created in the jest test suite.
if (process.env.NODE_ENV !== 'test') {
    app.listen(5001, () => {
        console.log('App listening on port 5001...');
    });
}

module.exports = app;
