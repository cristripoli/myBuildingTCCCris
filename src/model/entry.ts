export class Entry{

    private id: number;
    private description: string;
    private date: string;
    private value: number;
    private item_id: number;

    constructor(id:number, description: string, date: string, value:number, item_id: number){
      this.id = id;
      this.description = description;
      this.date = date;
      this.value = value;
      this.item_id = item_id;
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
    public getCategoryId():number{
        return this.item_id;
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
    public setItemId(item_id: number){
        this.item_id = item_id;
    }
}