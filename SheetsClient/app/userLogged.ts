export class UserLogged { 
    public pbId: string = null;
    public customerId: string = null;
    public email: string = null;
    
    constructor() {}
    
    isCustomer() {
        return this.pbId == null || this.pbId.trim().length == 0;
    }
    
}