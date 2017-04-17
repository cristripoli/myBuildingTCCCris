export class Building{

    private id: number;
    private name: string;
    private description: string;
    private estimated_value: number;
    private metreage: number;
    private id_user: number;

    constructor(id:number, name:string, description: string, estimated_value: number, metreage: number, id_user:number, ){
      this.id = id;
      this.name = name;
      this.description = description;
      this.estimated_value = estimated_value;
      this.metreage = metreage;
      this.id_user = id_user;      
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
    public getEstimatedValue():number{
        return this.estimated_value;
    }    
    public getMetreage():number{
        return this.metreage;
    } 
    public getUserId():number{
        return this.id_user;
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
    public setEstimatedValue(estimated_value: number){
        this.estimated_value = estimated_value;
    }
    public setMetreage(metreage: number){
        this.metreage = metreage;
    }
    public setUserId(user_id: number){
        this.id_user = user_id;
    }
}