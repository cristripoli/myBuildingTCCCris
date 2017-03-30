import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { EntryProvider } from '../../providers/entryProvider';
import { CategoryProvider } from '../../providers/categoryProvider';
import { Entry } from '../../model/entry';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { HomePage } from '../home/homePage';
/*
  Generated class for the Entry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entry',
  templateUrl: 'entryPage.html'
})
  export class EntryPage {
  private entry: Entry;
  private item: Item;
  private category: Category;
  private items: Array<Item>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider, public entryProvider: EntryProvider, public categoryProvider: CategoryProvider,) {
    this.entry = new Entry(null, "", "", null, null,null);
    console.log("EntryPage constructor");
    console.log(navParams);

    if(navParams.get('item') != null && navParams.get('item') != 'undefined'){
      this.fillItemParam(navParams);
    }

    if(navParams.get('category') == null || navParams.get('category') == 'undefined'){
      this.loadingCategory();
    }else{
      this.fillCategoryParam(navParams);
      this.loadingItemList();
    }   
 }

 private fillCategoryParam(navParams: NavParams){
    this.category = new Category(null,"","","");
    this.category = navParams.get('category');
    console.log("category: " + this.category);
  }

   private fillItemParam(navParams: NavParams){
    this.item = new Item(null,"","",null);
    this.item = navParams.get('item');
    console.log("item: " + this.item);
  }

  private loadingItemList() {
    this.itemProvider.listItemsByCategory(this.category.getId()).subscribe(
                      data => this.itemProvider.fillItemList(data),
                      err => console.log(err),
                      () => {
                              this.setItems(this.itemProvider.getItemList()); 
                              console.log(this.items);
                            }
                  );
  }

  private loadingCategory(){
    this.categoryProvider.getCategoryById(this.item.getId()).subscribe(
                      data => this.categoryProvider.fillCategory(data),
                      err => console.log(err),
                      () => {
                              this.setCategory(this.categoryProvider.getCategory()); 
                              console.log(this.category);
                              this.loadingItemList();
                            }
                  );
  }

  private saveEntry(entry: Entry){
    this.entryProvider.saveEntry(entry);
    this.back();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  logForm() {
    console.log(this.entry.getDescription);
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  public getEntry(): Entry{
    return this.entry;
  }

  public setEntry(entry: Entry){
    this.entry = entry;
  }

  public getCategory(): Category{
    return this.category;
  }

  public setCategory(category: Category){
    this.category = category;
  }

  public getItems(): Array<Item>{
    return this.items;
  }

  public setItems(items: Array<Item>){
    this.items = items;
  }
}
