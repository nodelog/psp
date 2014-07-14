var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ctit');
exports.mongoose = mongoose;