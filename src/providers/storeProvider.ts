import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';
import { StoreService } from '../services/storeService';
import { Store } from '../model/store';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StoreProvider {
    
  private apiStoreUrl:string;
  private storeList:Array<Store>;
  private store: Store;

  constructor(public http: Http, private storeService: StoreService) {
    this.apiStoreUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.STORE_URL);
    console.log('Hello StoreProvider Provider');
  }

  listStores(){
      console.log("List stores by category into provider method");
        this.storeList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiStoreUrl).map(res => res.json());
  }

  getStoreById(id: number){
      console.log("List stores by category into provider method");
        this.storeList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiStoreUrl + "/" + id).map(res => res.json());
  }

  public fillStoreList(data: any){
      console.log("data: " + data);
      this.storeList =  this.storeService.convertDataToStoreList(data);
      console.log("storeList: " +  this.storeList);        
  }

   public fillStore(data: any){
      console.log("data: " + data);
      this.store =  this.storeService.convertDataToStore(data);
      console.log("store: " +  this.store);        
  }
  
  public saveStore(store: Store){
      let headers = new Headers({ 'Content-Type':'application/json' });
      let storeJson = this.storeService.convertStoreToJson(store);
      console.log('json: ' + storeJson);
      let options = new RequestOptions({ headers: headers });
      this.http.post( this.apiStoreUrl , storeJson, options).subscribe(
                  data => this.verify(data),
                  err => this.handleError(err)
      );          
  }

  getStoreList() : Array<Store>{
      return this.storeList;
  }
  setStoreList(storeList: Array<Store>){
      this.storeList = storeList;
  }

  getStore() : Store{
      return this.store;
  }
  setStore(store: Store){
      this.store = store;
  }

  private handleError (error: Response | any) {
      console.log(error.json());
  }

  private verify(changeResult){
      console.log(changeResult);
  }

}
