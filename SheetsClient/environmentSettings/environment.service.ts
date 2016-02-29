export class Environment { 
    //public baseServiceUrl = 'http://localhost:3005/sheets/';
    public baseServiceUrl = 'http://ec2-54-213-172-98.us-west-2.compute.amazonaws.com:3005/sheets/';
    public stockPricesServiceUrlStart = "https://www.quandl.com/api/v3/datasets/WIKI/";
    public stockPricesServiceUrlEnd = ".csv?api_key=oVMreULVs1AP7stTsyA4&limit=1";
}