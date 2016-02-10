export class ProposalInvestmentSource { 
    public type: string;
    public id: string;
    public maxCapacity: number;
    
    constructor(inType: string, inId: string, inMaxCapacity: number) {
        this.type = inType;
        this.id = inId;
        this.maxCapacity = inMaxCapacity;
    }
    
}