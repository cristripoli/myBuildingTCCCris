export class SpentByMonth{

    private month: string;
    private totalSpent: number;
    private percent: number;

    constructor(month:string, totalSpent: number, percent: number){
      this.month = month;
      this.totalSpent = totalSpent;
      this.percent = percent;
    }
    
    public getMonth():string{
        return this.month;
    }
    public getTotalSpent():number{
        return this.totalSpent;
    }
    public getPercent():number{
        return this.percent;
    }
    public setMonth(month: string){
        this.month = month;
    }
    public setTotalSpent(totalSpent: number){
        this.totalSpent = totalSpent;
    }
    public setPercent(percent: number){
        this.percent = percent;
    }
}