let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    id: {type: String},
    numberExtern: {type: String},
    name: {type: String},
    typeProduct: {type: String},
    description: {type: String},
    photo: {type: String},
    supplierName: {type: String}, 
    supplierId: {type: Schema.ObjectId, ref: 'suppliers'}
}, {versionKey: false});

let Product = mongoose.model('products', productSchema);

module.exports = Product;