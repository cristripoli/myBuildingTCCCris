export class SpentByMonth{

    private month: string;
    private totalSpent: number;
    private percent: number;
    private totalPaid: number;
    private totalNotPaid: number;

    constructor(month:string, totalSpent: number, percent: number, totalPaid: number, totalNotPaid: number){
      this.month = month;
      this.totalSpent = totalSpent;
      this.percent = percent;
      this.totalPaid = totalPaid;
      this.totalNotPaid = totalNotPaid;
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
    public getTotalPaid():number{
        return this.percent;
    }
    public getTotalNotPaid():number{
        return this.percent;
    }
    public setMonth(month: string){
        this.month = month;
    }
    public setPercent(percent: number){
        this.percent = percent;
    }
    public setTotalPaid(totalSpent: number){
        this.totalSpent = totalSpent;
    }
    public setTotalNotPaid(percent: number){
        this.percent = percent;
    }
}