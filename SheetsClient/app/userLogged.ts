export class UserLogged { 
    public pbId: string = 'Jane Advisor';
    public customerId: string = 'Jack Client';
    public mail: string = 'jack.client@gmail.com';
    
    constructor() {}
    
    isCustomer() {
        return this.pbId == null || this.pbId.trim().length == 0;
    }
    
}