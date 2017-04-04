export class State{

    private id: number;
    private name: string;
    private initials: string;

    constructor(id:number, name:string, initials: string,){
      this.id = id;
      this.name = name;
      this.initials = initials;      
    }
    
    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getInitials():string{
        return this.initials;
    }
    public setId(id: number){
        this.id = id;
    }
    public setName(name: string){
        this.name = name;
    }
    public setInitials(initials: string){
        this.initials = initials;
    }
}