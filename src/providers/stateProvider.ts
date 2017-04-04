import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';
import { StateService } from '../services/stateService';
import { State } from '../model/state';

/*
  Generated class for the StateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StateProvider {
    
  private apiStateUrl:string;
  private stateList:Array<State>;

  constructor(public http: Http, private stateService: StateService) {
    this.apiStateUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.STATE_URL);
    console.log('Hello StateProvider Provider');
  }

  listStates(){
      console.log("List states by category into provider method");
        this.stateList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiStateUrl).map(res => res.json());
  }

  public fillStateList(data: any){
      console.log("data: " + data);
      this.stateList =  this.stateService.convertDataToStateList(data);
      console.log("stateList: " +  this.stateList);        
  }
  
  public saveState(state: State){
      let headers = new Headers({ 'Content-Type':'application/json' });
      let stateJson = this.stateService.convertStateToJson(state);
      console.log('json: ' + stateJson);
      let options = new RequestOptions({ headers: headers });
      this.http.post( this.apiStateUrl , stateJson, options).subscribe(
                  data => this.verify(data),
                  err => this.handleError(err)
      );          
  }

  getStateList() : Array<State>{
      return this.stateList;
  }
  setStateList(stateList: Array<State>){
      this.stateList = stateList;
  }

  private handleError (error: Response | any) {
      console.log(error.json());
  }

  private verify(changeResult){
      console.log(changeResult);
  }

}
