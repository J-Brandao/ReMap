const { memoize } = require('lodash');

module.exports = memoize(() => {
    const Firestore = require("@google-cloud/firestore");
    const keyFilename = '.api_key.json';
    return new Firestore({keyFilename});
});