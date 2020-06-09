let Supplier = require('../model/supplier');
let Product = require('../model/product');

class SupplierService {
    
    findAllSuppliers(res) {
        Supplier.find((err, suppliers) => {
            if(err) res.send(err);
            res.send(suppliers);
          });
    }

    saveUpdateSupplier(req, res) {
         if(req.body.supplierId === "") {
            let supplier = new Supplier({
                numberExtern: req.body.numberExtern,
                name: req.body.supplierName,
                address: req.body.address,
                telephone: req.body.telephone,
                email: req.body.email 
            });
            supplier.save((err, response) => {
                if(err) res.send(err);
                console.log(response);
                res.send(supplier);
            });
        } else {
            Supplier.findByIdAndUpdate(req.body.supplierId, { $set: req.body }, (err, model) => {
                console.log(req.body);
                if(err) res.send(err);
                res.send(model);
            }); 
        }
    }

    //PROBAR SI FUNCIONA O HAY QUE DEVOLVER UN RES SEND
    deleteProductsFromSupplier(supplierId) {
        Product.deleteMany({supplierId: supplierId}, (err, result) => {
            if(err) return false;
            console.log(result);
            return true;
        });
    }

    deleteSupplierById(req, res) {
        let supplierId = req.params.id;
        if(this.deleteProductsFromSupplier(supplierId)) {
            Supplier.deleteOne({_id: supplierId}, (err) => {
                if(err) res.send(false);
                res.send(true);
            });
        } else {
            console.log("Fallo borrar productos de un supplier")
            res.send(false);
        }   
    }

    findSupplierById(req, res) {
        let supplierId = req.body.supplierId;
        Supplier.findOne({_id: supplierId}, (err, supplier) => {
            if(err) res.send(err);
            res.send(new Array(supplier));
        });
    }

    findSupplier(req, res) {
        let supplierId = req.body.supplierId;
        Supplier.findOne({_id: supplierId}, (err, supplier) => {
            if(err) res.send(err);
            res.send(supplier);
        });
    }

    getSuppliersByParams(req, res) {
        let nameSupplier = req.body.searchByName;
        let numberExternSupplier = req.body.searchByNumberExtern;
        Supplier.find({
            name: {$regex: nameSupplier, $options: 'i'}, 
            numberExtern: {$regex: numberExternSupplier, $options: 'i'}}, 
            (err, suppliers) => {
                if(err) return err;
                res.send(suppliers);
        });
    }

}

module.exports = SupplierService;

