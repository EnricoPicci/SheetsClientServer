  export class ReturnData { 
    public data:Array<any> = new Array<any>();
    
    public isEmpty() {
        return this.data.length == 0;
    }
  }
  
