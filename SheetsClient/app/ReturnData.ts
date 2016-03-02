  export class ReturnData { 
    public data = new Array<any>();
    
    public isEmpty() {
        return this.data.length == 0;
    }
    
    clearData() {
        this.data = new Array<any>();
    }
    
  }
  
