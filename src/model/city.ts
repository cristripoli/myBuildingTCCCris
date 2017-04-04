export class City{

    private id: number;
    private name: string;
    private state_id: number;

    constructor(id:number, name:string, state_id: number,){
      this.id = id;
      this.name = name;
      this.state_id = state_id;
    }
    
    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getStateId():number{
        return this.state_id;
    }
    public setId(id: number){
        this.id = id;
    }
    public setName(name: string){
        this.name = name;
    }
    public setStateId(state_id: number){
        this.state_id = state_id;
    }
}