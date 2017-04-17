import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Building } from '../model/building';
import { BuildingService } from '../services/buildingService';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';

/*
  Generated class for the BuildingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BuildingProvider{

    private apiBuildingUrl:string;
    private buildingList:Array<Building>;
    private building: Building;

    constructor(private buildingService: BuildingService,
        public http: Http) {
            this.apiBuildingUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.BUILDING_URL);
            console.log('Hello BuildingProvider Provider');
    }


    public getBuildingById(id: number){
            console.log("Get building by Id");
            this.building = new Building(null,"","",null,null,null);
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.apiBuildingUrl + "/1" ).map(res => res.json());       
    }

    public fillBuilding(data: any){
        console.log("data: " + data);
        this.building =  this.buildingService.convertDataToBuilding(data);
        console.log("building: " +  this.building);        
    }

    getBuilding() : Building{
        return this.building;
    }
    setBuilding(building: Building){
        this.building= building;
    }
}
