// Returns the url path of the root directory 
const path = require('path');


module.exports = path.dirname(process.mainModule.filename);