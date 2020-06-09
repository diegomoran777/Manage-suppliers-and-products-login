let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: {type: String},
    userName: {type: String},
    password: {type: String},
    allowedRole: {type: Boolean}
}, {versionKey: false});

let User = mongoose.model('user', userSchema);

module.exports = User