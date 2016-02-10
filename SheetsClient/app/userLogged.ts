export class UserLogged { 
    public pbId: string;
    public customerId: string;
    
    constructor() {}
    
    isCustomer() {
        return this.pbId == null;
    }
    
}