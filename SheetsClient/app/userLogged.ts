export class UserLogged { 
    public pbId: string = null;
    public customerId: string = null;
    
    constructor() {}
    
    isCustomer() {
        return this.pbId == null;
    }
    
}