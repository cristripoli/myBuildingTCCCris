import {Injectable} from '@angular/core';
import { Item } from '../model/item';

@Injectable()
export class ItemService {

    convertDataToItemList(data:any):Array<Item> {

       let item:Item;
       let itemList = new Array<Item>();
     
       for (let json of data) {
         console.log("json: " + json);
         item = new Item(json.id,json.name,json.description,json.id_category);
         console.log("Object item get: " + item.getName());
         itemList.push(item);
       }

       return itemList
    }

    public convertItemToJson(item: Item){
      let itemJson = JSON.stringify({
        "name": item.getName(),
        "description": item.getDescription(), 
        "category_id": item.getCategoryId()
      });
      return itemJson;
  }
}