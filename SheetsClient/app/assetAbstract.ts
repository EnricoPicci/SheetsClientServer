export abstract class AssetAbstract {
    public name: string;
    public weight: number;
    public oneMonthRet: string;
    public oneYearRet: string;
    public minWeight: number;
    public maxWeight: number;
    public range: any;
    
    public show: boolean = true;
    public locked: boolean = false;
    
    public pips: any;
    public relativeStartOfScale: number = 0;
    
    public newWeight: any;
    
    constructor(inName: string, 
                        inWeight: number, 
                        inOneMonthRet: string, 
                        inOneYearRet: string, 
                        inMinWeight: number, 
                        inMaxWeight: number) {
        this.name = inName;
        this.weight = inWeight;
        this.oneMonthRet = inOneMonthRet;
        this.oneYearRet = inOneYearRet;
        this.minWeight = inMinWeight;
        this.maxWeight = inMaxWeight;
        this.range = {'min': this.minWeight, 'max': this.maxWeight};
        this.pips = {mode: 'values',
                values: [inMinWeight, inMaxWeight],
				density: 10};
    }
    
    setWeight(inWeight: number) {
        this.newWeight = {newWeight: inWeight};
        this.weight = inWeight;    
    }
    
    setLocked(inLocked: boolean) {
        this.locked = inLocked;
    }

    checkConsistency() {
        if (this.weight < this.minWeight) {
            console.error(this.name + ': Weight less than allowed min');
        }
        if (this.weight > this.maxWeight) {
            console.error(this.name + ': Weight more than allowed max');
        }
    }
    
    getRangeLength() {
        let ret = this.range.max - this.range.min;
        return ret;
    }
   
}