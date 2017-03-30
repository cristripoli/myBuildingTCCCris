import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Entry } from '../model/entry';
import { EntryService } from '../services/entryService';
import { SettingsEnum } from '../enum/settingsEnum';
import { UtilService } from '../services/utilService';

/*
  Generated class for the Entry provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EntryProvider {

  private apiEntriesByCategoryUrl:string;
  private apiEntriesByItemUrl:string;
  private apiEntryUrl:string;
  private entryList:Array<Entry>;

  constructor( private entryService: EntryService,
    public http: Http ) {
    this.apiEntriesByCategoryUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.ENTRY_GET_ENTRIES_BY_CATEGORY_URL);
    this.apiEntriesByItemUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.ENTRY_GET_ENTRIES_BY_ITEM_URL);
    this.apiEntryUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.ENTRY_URL);
    console.log('Hello Entry Provider');
  }

  listEntriesByCategory(idCategory: number){
        console.log("List entries by category into provider method");
         this.entryList = [];
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.apiEntriesByCategoryUrl + "/" + idCategory).map(res => res.json());
    }

   listEntriesByItem(idItem: number){
        console.log("List entries by item into provider method");
         this.entryList = [];
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.apiEntriesByItemUrl + "/" + idItem).map(res => res.json());
    }

    public fillEntryList(data: any){
        console.log("data: " + data);
        this.entryList =  this.entryService.convertDataToEntryList(data);
        console.log("entryList: " +  this.entryList);        
    }

    public saveEntry(entry: Entry){
        let headers = new Headers({ 'Content-Type':'application/json' });
        let entryJson = this.entryService.convertEntryToJson(entry);
        console.log('json: ' + entryJson);
        let options = new RequestOptions({ headers: headers });
        this.http.post( this.apiEntryUrl , entryJson, options).subscribe(
                    data => this.verify(data),
                    err => this.handleError(err)
        );          
    }

    getEntryList() : Array<Entry>{
        return this.entryList;
    }
    setEntryList(entryList: Array<Entry>){
        this.entryList = entryList;
    }

    private handleError (error: Response | any) {
        console.log(error.json());
    }

    private verify(changeResult){
       console.log(changeResult);
       ;

    }

}
