import{AssetAbstract} from './assetAbstract';
//import{AssetGroup} from './assetGroup';

export class Asset extends AssetAbstract {
    public symbol: string;
    //public assetGroup: AssetGroup;

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
}