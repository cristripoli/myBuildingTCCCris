import {Injectable} from '@angular/core';
import { Category } from '../model/category';

@Injectable()
export class CategoryService {

    convertDataToCategoryList(data:any):Array<Category> {

       let category:Category;
       let categoryList = new Array<Category>();
     
       for (let json of data) {
         console.log("json: " + json);
         category = new Category(json.id,json.name,json.description,json.icon);
         console.log("Object category get: " + category.getName());
         categoryList.push(category);
       }

       return categoryList
    }
  }