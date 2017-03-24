import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';
import { ItemService } from '../services/itemService';
import { Item } from '../model/item';

/*
  Generated class for the ItemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ItemProvider {

  private apiItemsByCategoryUrl:string;
  private itemList:Array<Item>;

  constructor(public http: Http, private itemService: ItemService) {
    this.apiItemsByCategoryUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.ITEM_GET_ITEMS_BY_CATEGORY_URL);
    console.log('Hello ItemProvider Provider');
  }

  listItemsByCategory(idCategory: number){
      console.log("List items by category into provider method");
        this.itemList = [];
          let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
          let options = new RequestOptions({ headers: headers });
          return this.http.get(this.apiItemsByCategoryUrl + "/" + idCategory).map(res => res.json());
  }

  public fillItemList(data: any){
      console.log("data: " + data);
      this.itemList =  this.itemService.convertDataToItemList(data);
      console.log("itemList: " +  this.itemList);        
  }

  getItemList() : Array<Item>{
      return this.itemList;
  }
  setItemList(itemList: Array<Item>){
      this.itemList = itemList;
  }

}
