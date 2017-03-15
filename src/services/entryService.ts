import {Injectable} from '@angular/core';
import { Entry } from '../model/entry';

@Injectable()
export class EntryService {

    convertDataToEntryList(data:any):Array<Entry> {

       let entry: Entry;
       let entryList = new Array<Entry>();
     
       for (let json of data) {
         console.log("json: " + json);
         entry = new Entry(json.id,json.description,json.date,json.value,json.id_item);
         console.log("Object entry get: " + entry.getId);
         entryList.push(entry);
       }

       return entryList
    }
  }