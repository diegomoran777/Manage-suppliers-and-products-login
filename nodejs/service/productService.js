let Types = require('../dto/types');
let Product = require('../model/product');

class ProductService {
    types = new Types();

    findAllProducts(res) {
        Product.find((err, products) => {
            if(err) res.send(err);
            res.send(products);
        });
    }

    saveUpdateProduct(req, res) {
        if(req.body.productId === "") {
            let product = new Product({
                numberExtern: req.body.numberExtern,
                name: req.body.productName,
                typeProduct: req.body.typeProduct,
                description: req.body.description,
                photo: req.body.photo,
                supplierName: req.body.supplierName, 
                supplierId: req.body.supplierId
            });
            product.save((err, response) => {
                if(err) res.send(err);
                console.log(response);
                res.send(product);
            });
        } else {
            Product.findByIdAndUpdate(req.body.productId, {$set: req.body}, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            });
        }
    }

    getAllTypes(res) {
        this.types.clearTypes();
        Product.find((err, products) => {
            if(err) return err;
            products.forEach( product => this.types.getTypes().add(product.typeProduct));
          });
        res.send(this.types.getTypes());
    }

    getTypesBySupplier(req, res) {
        let supplierId = req.params.id;
        this.types.clearTypes();
        Product.find({supplierId: supplierId}).exec((err, products) => {
            if (err) return err;  
            products.forEach( product => this.types.getTypes().add(product.typeProduct));
        });
        res.send(this.types.getTypes());
    }

    deleteProductById(req, res) {
        let productId = req.params.id;
        Product.deleteOne({_id: productId}, (err) => {
            if(err) res.send(false);
            res.send(true);
        });
    }

    findProductById(req, res) {
        let productId = req.body.productId;
        Product.findOne({_id: productId}, (err, product) => {
            if(err) res.send(err);
            res.send(new Array(product));
        });
    }

    findProduct(req, res) {
        let productId = req.body.productId;
        Product.findOne({_id: productId}, (err, product) => {
            if(err) res.send(err);
            res.send(product);
        });
    }

    findProductsBySupplierId(req, res) {
        let supplierId = req.params.id;
        Product.find({supplierId: supplierId}).exec((err, products) => {
            if(err) res.send(err);
            res.send(products);
        });
    }

    getProductByPrams(req, res) {
        let id = req.body.supplierId;
        let nameProduct =  req.body.searchByName;
        let numberExternProduct = req.body.searchByNumberExtern;
        let typeProduct = req.body.searchByType;
        Product.find({
            supplierId: {$regex: id},
            name: {$regex: nameProduct, $options: 'i'}, 
            numberExtern: {$regex: numberExternProduct, $options: 'i'},
            type: {$regex: typeProduct, $options: 'i'}}, 
            (err, products) => {
                if(err) return err;
                res.send(products);
        });
    }

}

module.exports = ProductService;