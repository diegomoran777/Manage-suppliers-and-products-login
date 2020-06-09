export class Product {
    id: string;
    numberExtern: string;
    name: string;
    type: string;
    description: string;
    photo: string;
    supplierId: string;
    supplierName: string;

    constructor() {
        
    }

    public setSupplierId(supplierId: string) {
        this.supplierId = supplierId;
    }

    public setSupplierName(supplierName: string) {
        this.supplierName = supplierName;
    }

    public setAll() {
        this.id = '';
        this.numberExtern = '';
        this.name = '';
        this.type = '';
        this.description = '';
        this.photo = '';
    }

}