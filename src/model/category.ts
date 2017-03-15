export class Category{

    private id: number;
    private name: string;
    private description: string;
    private icon: string;
    private total: number;

    constructor(id:number, name:string, description: string, icon: string){
      this.id = id;
      this.name = name;
      this.description = description;
      this.icon = icon;
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
    public getIcon():string{
        return this.icon;
    }
    public getTotal():number{
        return this.total;
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
    public setIcon(icon: string){
        this.icon = icon;
    }
    public setTotal(total: number){
        this.total = total;
    }
}