export class Supplier {
    id: string;
    numberExtern: string;
    name: string;
    address: string;
    telephone: string;
    email: string;

    constructor() {
        
    }

    public setClearAll() {
        this.id = '';
        this.numberExtern = '';
        this.name = '';
        this.address = '';
        this.telephone = '';
        this.email = '';
    }
}