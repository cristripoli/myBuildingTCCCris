import {Injectable} from '@angular/core';
import { Entry } from '../model/entry';

@Injectable()
export class EntryService {

    convertDataToEntryList(data:any):Array<Entry> {

       let entry: Entry;
       let entryList = new Array<Entry>();
     
       for (let json of data) {
         console.log("json: " + json);
         entry = new Entry(json.id,json.description,json.date,json.value,json.id_item,json.paid,
                           json.quantity,json.value*json.quantity,json.store_id);
         console.log("Object entry get: " + entry.getId);
         entryList.push(entry);
       }

       return entryList
    }

    convertEntryToJson(entry: Entry){
      let entryJson = JSON.stringify({
        "id": entry.getId(),
        "description": entry.getDescription(), 
        "date": entry.getDate(),
        "value": entry.getValue(),
        "id_item": entry.getIdItem(),
        "paid": entry.isPaid(),
        "quantity": entry.getQuantity(),
        "store_id": entry.getStoreId()
      });
      return entryJson;
    }
    
  }