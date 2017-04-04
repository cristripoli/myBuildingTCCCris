export class Store{

    private id: number;
    private name: string;
    private city_id: number;

    constructor(id:number, name:string, city_id: number,){
      this.id = id;
      this.name = name;
      this.city_id = city_id;
    }
    
    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getCityId():number{
        return this.city_id;
    }
    public setId(id: number){
        this.id = id;
    }
    public setName(name: string){
        this.name = name;
    }
    public setCityId(city_id: number){
        this.city_id = city_id;
    }
}