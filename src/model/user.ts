export class User{

    private id: number;
    private name: string;
    private email: string;
    private id_credentials: number;
    private id_city: number;

    constructor(id:number, name: string, email: string, id_credentials: number, id_city: number){
      this.id = id;
      this.name = name;
      this.email = email;
      this.id_credentials = id_credentials;
      this.id_city = id_city;
    }
    
    public getId():number{
        return this.id;
    }
    public getName():string{
        return this.name;
    }
    public getEmail():string{
        return this.email;
    }
    public getIdCredentials():number{
        return this.id_credentials;
    }
    public getIdCity():number{
        return this.id_city;
    }
    public setId(id: number){
        this.id = id;
    }
    public setName(name: string){
        this.name = name;
    }
    public setEmail(email: string){
        this.email = email;
    }
    public setIdCredentials(id_credentials: number){
        this.id_credentials = id_credentials;
    }
    public setIdCity(id_city: number){
        this.id_city = id_city;
    }
}