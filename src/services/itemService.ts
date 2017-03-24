import {Injectable} from '@angular/core';
import { Item } from '../model/item';

@Injectable()
export class ItemService {

    convertDataToItemList(data:any):Array<Item> {

       let item:Item;
       let itemList = new Array<Item>();
     
       for (let json of data) {
         console.log("json: " + json);
         item = new Item(json.id,json.name,json.description,json.category_id);
         console.log("Object item get: " + item.getName());
         itemList.push(item);
       }

       return itemList
    }
  }