export class Item{

    private id: number;
    private name: string;
    private description: string;
    private category_id: number;

    constructor(id:number, name:string, description: string, category_id: number){
      this.id = id;
      this.name = name;
      this.description = description;
      this.category_id = category_id;
    }
    
    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getDescription():string{
        return this.description;
    }
    public getCategoryId():number{
        return this.category_id;
    }
    public setId(id: number){
        this.id = id;
    }
    public setName(name: string){
        this.name = name;
    }
    public setDescription(description: string){
        this.description = description;
    }
    public setCategoryId(category_id: number){
        this.category_id = category_id;
    }
}