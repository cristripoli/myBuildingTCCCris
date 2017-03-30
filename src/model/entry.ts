export class Entry{

    private id: number;
    private description: string;
    private date: string;
    private value: number;
    private id_item: number;
    private paid: boolean;
    private total: number;

    constructor(id:number, description: string, date: string, value:number, id_item: number, paid: boolean){
      this.id = id;
      this.description = description;
      this.date = date;
      this.value = value;
      this.id_item = id_item;
      this.paid = paid;
    }
    
    public getId():number{
        return this.id;
    }
    public getDescription():string{
        return this.description;
    }
    public getDate():string{
        return this.date;
    }
    public getValue():number{
        return this.value;
    }
    public getIdItem():number{
        return this.id_item;
    }
    public isPaid():boolean{
        return this.paid;
    }
    public getTotal():number{
        return this.total;
    }
    public setId(id: number){
        this.id = id;
    }
    public setDescription(description: string){
        this.description = description;
    }
    public setDate(date: string){
        this.date = date;
    }
    public setValue(value: number){
        this.value = value;
    }
    public setIdItem(id_item: number){
        this.id_item = id_item;
    }
    public setPaid(paid: boolean){
        this.paid = paid;
    }
    public setTotal(total: number){
        this.total = total;
    }
}