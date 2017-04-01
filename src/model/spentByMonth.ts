export class SpentByMonth{

    private month: string;
    private totalSpent: number;

    constructor(month:string, totalSpent: number){
      this.month = month;
      this.totalSpent = totalSpent;
    }
    
    public getMonth():string{
        return this.month;
    }
    public getTotalSpent():number{
        return this.totalSpent;
    }
    public setMonth(month: string){
        this.month = month;
    }
    public setTotalSpent(totalSpent: number){
        this.totalSpent = totalSpent;
    }
}