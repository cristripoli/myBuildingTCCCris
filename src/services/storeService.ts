import {Injectable} from '@angular/core';
import { Store } from '../model/store';

@Injectable()
export class StoreService {

    convertDataToStoreList(data:any):Array<Store> {

       let store:Store;
       let storeList = new Array<Store>();
     
       for (let json of data) {
         console.log("json: " + json);
         store = new Store(json.id,json.name,json.description);
         console.log("Object store get: " + store.getName());
         storeList.push(store);
       }

       return storeList
    }

    convertDataToStore(data:any):Store {

      let store:Store;
      store = new Store(data[0].id,data[0].name,data[0].description);
      console.log("Object store get: " + store.getName());

      return store
    }

    public convertStoreToJson(store: Store){
      let storeJson = JSON.stringify({
        "name": store.getName(),
        "city_id": store.getCityId()
      });
      return storeJson;
  }
}