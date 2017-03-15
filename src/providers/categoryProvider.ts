import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from '../model/category';
import { CategoryService } from '../services/categoryService';
import {SettingsEnum} from '../enum/settingsEnum';
import {UtilService} from '../services/utilService';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoryProvider{

  private apiCategoryUrl:string;
  private categoryList:Array<Category>;

  constructor(private categoryService: CategoryService,
    public http: Http) {
        this.apiCategoryUrl = UtilService.getEnumString(SettingsEnum, SettingsEnum.CATEGORY_URL);
        console.log('Hello CategoryProvider Provider');
  }

  listCategories(){
        console.log("List categories provider method");
         this.categoryList = [];
            let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.apiCategoryUrl).map(res => res.json());
    }

    public fillCategoryList(data: any){
        console.log("data: " + data);
        this.categoryList =  this.categoryService.convertDataToCategoryList(data);
        console.log("categoryList: " +  this.categoryList);        
    }

    getCategoryList() : Array<Category>{
        return this.categoryList;
    }
    setCategoryList(categoryList: Array<Category>){
        this.categoryList = categoryList;
    }

}
