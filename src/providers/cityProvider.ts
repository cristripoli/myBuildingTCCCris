import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';
import { CityService } from '../services/cityService';
import { City } from '../model/city';

/*
  Generated class for the CityProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CityProvider {
    
  private apiCityUrl:string;
  private apiCityByStateUrl:string;
  private cityList:Array<City>;

  constructor(public http: Http, private cityService: CityService) {
    this.apiCityByStateUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.CITY_GET_CITIES_BY_STATE_URL);
    console.log('Hello CityProvider Provider');
  }

  listCities(){
      console.log("List cities into provider method");
        this.cityList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiCityUrl).map(res => res.json());
  }

  listCitiesByState(stateId: number){
      console.log("List citys by state into provider method");
        this.cityList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiCityByStateUrl + "/" + stateId).map(res => res.json());
  }

  public fillCityList(data: any){
      console.log("data: " + data);
      this.cityList =  this.cityService.convertDataToCityList(data);
      console.log("cityList: " +  this.cityList);        
  }
  
  public saveCity(city: City){
      let headers = new Headers({ 'Content-Type':'application/json' });
      let cityJson = this.cityService.convertCityToJson(city);
      console.log('json: ' + cityJson);
      let options = new RequestOptions({ headers: headers });
      this.http.post( this.apiCityUrl , cityJson, options).subscribe(
                  data => this.verify(data),
                  err => this.handleError(err)
      );          
  }

  getCityList() : Array<City>{
      return this.cityList;
  }
  setCityList(cityList: Array<City>){
      this.cityList = cityList;
  }

  private handleError (error: Response | any) {
      console.log(error.json());
  }

  private verify(changeResult){
      console.log(changeResult);
  }

}
