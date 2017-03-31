import {Injectable} from '@angular/core';
import { Building } from '../model/building';

@Injectable()
export class BuildingService {

    convertDataToBuildingList(data:any):Array<Building> {

       let building:Building;
       let buildingList = new Array<Building>();
     
       for (let json of data) {
         console.log("json: " + json);
         building = new Building(json.id,json.name,json.description,json.estimated_value,json.id_user);
         console.log("Object building get: " + building.getName());
         buildingList.push(building);
       }

       return buildingList
    }

    convertDataToBuilding(data:any):Building {

       let building:Building;
       building = new Building(data[0].id,data[0].name,data[0].description,data[0].estimated_value,data[0].id_user);
       console.log("Object building get: " + building.getName());

       return building
    }

    public convertBuildingToJson(building: Building){
      let buildingJson = JSON.stringify({
        "name": building.getName(),
        "description": building.getDescription(), 
        "estimated_value": building.getEstimatedValue(),                 
        "id_user": building.getUserId
      });
      return buildingJson;
  }
}  