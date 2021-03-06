export class ProposalInvestmentSource { 
    public type: string;
    public id: string;
    public maxCapacity: number;
    
    constructor(inType: string, inId: string, inMaxCapacity: number) {
        this.type = inType;
        this.id = inId;
        this.maxCapacity = inMaxCapacity;
    }
    
    getMaxCapacityFormatted() {
        let ret = '';
        if (this.maxCapacity) {
            //ret = this.maxCapacity.toLocaleString('it-IT') + ' €';
            ret = (Math.round(this.maxCapacity*100)/100).toLocaleString('it-IT');
        }
        return ret;
    }
    
}