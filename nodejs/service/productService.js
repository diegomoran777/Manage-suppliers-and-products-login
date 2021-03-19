const Types = require('../dto/types');
const Product = require('../model/product');

    types = new Types();

    const findAllProducts = async (res) => {
        await Product.find((err, products) => {
            if(err) res.send(err);
            res.send(products);
        });
    }

    const saveUpdateProduct = async (req, res) => {
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
            await product.save((err, response) => {
                if(err) res.send(err);
                console.log(response);
                res.send(product);
            });
        } else {
            await Product.findByIdAndUpdate(req.body.productId, {$set: req.body}, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            });
        }
    }

    const getAllTypes = async (res) => {
        this.types.clearTypes();
        await Product.find((err, products) => {
            if(err) return err;
            products.forEach( product => this.types.getTypes().add(product.typeProduct));
            });
        res.send(this.types.getTypes());
    }

    const getTypesBySupplier = async (req, res) => {
        let supplierId = req.params.id;
        this.types.clearTypes();
        await Product.find({supplierId: supplierId}).exec((err, products) => {
            if (err) return err;  
            products.forEach( product => this.types.getTypes().add(product.typeProduct));
        });
        res.send(this.types.getTypes());
    }

    const deleteProductById = async (req, res) => {
        let productId = req.params.id;
        await Product.deleteOne({_id: productId}, (err) => {
            if(err) res.send(false);
            res.send(true);
        });
    }

    const findProductById = async (req, res) => {
        let productId = req.body.productId;
        await Product.findOne({_id: productId}, (err, product) => {
            if(err) res.send(err);
            res.send(new Array(product));
        });
    }

    const findProduct = async (req, res) => {
        let productId = req.body.productId;
        await Product.findOne({_id: productId}, (err, product) => {
            if(err) res.send(err);
            res.send(product);
        });
    }

    const findProductsBySupplierId = async (req, res) => {
        let supplierId = req.params.id;
        await Product.find({supplierId: supplierId}).exec((err, products) => {
            if(err) res.send(err);
            res.send(products);
        });
    }

    const getProductByPrams = async (req, res) => {
        let id = req.body.supplierId;
        let nameProduct =  req.body.searchByName;
        let numberExternProduct = req.body.searchByNumberExtern;
        let typeProduct = req.body.searchByType;
        await Product.find({
            supplierId: {$regex: id},
            name: {$regex: nameProduct, $options: 'i'}, 
            numberExtern: {$regex: numberExternProduct, $options: 'i'},
            type: {$regex: typeProduct, $options: 'i'}}, 
            (err, products) => {
                if(err) return err;
                res.send(products);
        });
    }

module.exports = {
    findAllProducts,
    saveUpdateProduct,
    getAllTypes,
    getTypesBySupplier,
    deleteProductById,
    findProductById,
    findProduct,
    findProductsBySupplierId,
    getProductByPrams

}