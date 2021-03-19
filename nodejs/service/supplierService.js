const Supplier = require('../model/supplier');
const Product = require('../model/product');

    
   const findAllSuppliers = async (res) => {
        await Supplier.find((err, suppliers) => {
            if(err) res.send(err);
            res.send(suppliers);
          });
    }

    const saveUpdateSupplier = async (req, res) => {
         if(req.body.supplierId === "") {
            let supplier = new Supplier({
                numberExtern: req.body.numberExtern,
                name: req.body.supplierName,
                address: req.body.address,
                telephone: req.body.telephone,
                email: req.body.email 
            });
            await supplier.save((err, response) => {
                if(err) res.send(err);
                console.log(response);
                res.send(supplier);
            });
        } else {
            await Supplier.findByIdAndUpdate(req.body.supplierId, { $set: req.body }, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            }); 
        }
    }

    const deleteProductsFromSupplier = async (supplierId) => {
        await Product.deleteMany({supplierId: supplierId}, (err, result) => {
            if(err) return false;
            console.log(result);
            return true;
        });
    }

    const deleteSupplierById = async (req, res) => {
        let supplierId = req.params.id;
        if(await deleteProductsFromSupplier(supplierId)) {
            await Supplier.deleteOne({_id: supplierId}, (err) => {
                if(err) res.send(false);
                res.send(true);
            });
        } else {
            console.log("Fallo borrar productos de un supplier")
            res.send(false);
        }   
    }

    const findSupplierById = async (req, res) => {
        let supplierId = req.body.supplierId;
        await Supplier.findOne({_id: supplierId}, (err, supplier) => {
            if(err) res.send(err);
            res.send(new Array(supplier));
        });
    }

    const findSupplier = async (req, res) => {
        let supplierId = req.body.supplierId;
        await Supplier.findOne({_id: supplierId}, (err, supplier) => {
            if(err) res.send(err);
            res.send(supplier);
        });
    }

    const getSuppliersByParams = async (req, res) => {
        let nameSupplier = req.body.searchByName;
        let numberExternSupplier = req.body.searchByNumberExtern;
        await Supplier.find({
            name: {$regex: nameSupplier, $options: 'i'}, 
            numberExtern: {$regex: numberExternSupplier, $options: 'i'}}, 
            (err, suppliers) => {
                if(err) return err;
                res.send(suppliers);
        });
    }


module.exports = {
    findAllSuppliers,
    saveUpdateSupplier,
    deleteProductsFromSupplier,
    deleteSupplierById,
    findSupplierById,
    findSupplier,
    getSuppliersByParams
}

