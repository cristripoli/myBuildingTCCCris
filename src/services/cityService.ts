import {Injectable} from '@angular/core';
import { City } from '../model/city';

@Injectable()
export class CityService {

    convertDataToCityList(data:any):Array<City> {

       let city:City;
       let cityList = new Array<City>();
     
       for (let json of data) {
         console.log("json: " + json);
         city = new City(json.id,json.name,json.state_id);
         console.log("Object city get: " + city.getName());
         cityList.push(city);
       }

       return cityList
    }

    public convertCityToJson(city: City){
      let cityJson = JSON.stringify({
        "name": city.getName(),
        "city_id": city.getStateId()
      });
      return cityJson;
  }
}