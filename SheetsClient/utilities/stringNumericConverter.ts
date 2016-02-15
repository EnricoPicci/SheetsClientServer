export class StringNumericConverter { 
	public static getNumberFromPercentageString(inPercentageString: string) {
        let indexOfPercentageSymbol = inPercentageString.indexOf('%');
        let retAsString = inPercentageString.substring(0, indexOfPercentageSymbol);
        let ret = parseFloat(retAsString);
        return ret;
    }
}