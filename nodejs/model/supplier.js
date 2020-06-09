let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let supplierSchema = new Schema({
    id: {type: String},
    numberExtern: {type: String},
    name: {type: String},
    address: {type: String},
    telephone: {type: String},
    email: {type: String}
}, {versionKey: false});

let Supplier = mongoose.model('suppliers', supplierSchema);

module.exports = Supplier;