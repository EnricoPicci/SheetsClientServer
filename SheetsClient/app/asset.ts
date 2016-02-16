import{AssetAbstract} from './assetAbstract';
//import{AssetGroup} from './assetGroup';

export class Asset extends AssetAbstract {
    public symbol: string;
    public openPrice: number;
    public lowPrice: number;
    public highPrice: number; 
    public closePrice: number;
    public volume: number;
    public dateOfPrices: string;
    
    public isValidated = true;
    
    public showTooltip = false;

    public constructor(inName: string, 
                        inSymbol: string,
                        inWeight: number, 
                        inOneMonthRet: string, 
                        inOneYearRet: string, 
                        inMinWeigth: number, 
                        inMaxWeigth: number) {
        super(inName, inWeight, inOneMonthRet, inOneYearRet, 
                        inMinWeigth, inMaxWeigth);
        this.symbol = inSymbol;
    }
    
    hasPriceData() {
        return this.openPrice != null;
    }
    
    getVolumeFormatted() {
        let formattedString;
        if (this.volume) {
            formattedString = this.volume.toLocaleString('it-IT');
        }
        return formattedString
    }
}