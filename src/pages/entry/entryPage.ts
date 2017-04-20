import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { StoreProvider } from '../../providers/storeProvider';
import { EntryProvider } from '../../providers/entryProvider';
import { CategoryProvider } from '../../providers/categoryProvider';
import { Entry } from '../../model/entry';
import { Item } from '../../model/item';
import { Store } from '../../model/store';
import { Category } from '../../model/category';
import { HomePage } from '../home/homePage';
import { StorePage } from '../store/storePage';
import * as moment from 'moment';
/*
  Generated class for the Entry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entry, decimal-pipe, currency-pipe',
  templateUrl: 'entryPage.html'
})
  export class EntryPage {
  private entry: Entry;
  private item: Item;
  private category: Category;
  private items: Array<Item>;
  private stores: Array<Store>;
  private total: string;
  public isCategoryRead = false;
  public hasItemList: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider,
              public entryProvider: EntryProvider, public categoryProvider: CategoryProvider, public storeProvider: StoreProvider) {
    this.entry = new Entry(null, "", new Date().toISOString(), null, null,null,1,0,null);
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

    this.loadingStoreList();
 }

 private fillCategoryParam(navParams: NavParams){
    this.category = new Category(null,"","","");
    this.category = navParams.get('category');
    console.log("category: " + this.category.getName());
    this.isCategoryRead = true;
    this.hasItemList = true;
  }

   private fillItemParam(navParams: NavParams){
    this.item = new Item(null,"","",null);
    this.item = navParams.get('item');
    console.log("item: " + this.item.getName());
    this.hasItemList = false;
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
    this.categoryProvider.getCategoryById(this.item.getCategoryId()).subscribe(
          data => this.categoryProvider.fillCategory(data),
          err => console.log(err),
          () => {
                  this.setCategory(this.categoryProvider.getCategory());
                  console.log(this.category);
                  this.isCategoryRead = true;
                }
      );
  }

  private loadingStoreList() {
  this.storeProvider.listStores().subscribe(
        data => this.storeProvider.fillStoreList(data),
        err => console.log(err),
        () => {
                this.setStores(this.storeProvider.getStoreList());
                console.log(this.stores);
              }
    );
  }

  private saveEntry(entry: Entry){
    entry.setDate(moment(entry.getDate()).format('YYYY-MM-DD'));
    this.entryProvider.saveEntry(entry);
    this.back();
  }

  onKey(event: any) { // without type info
    this.entry.setTotal(this.getEntry().getQuantity() * this.getEntry().getValue());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  logForm() {
    console.log(this.entry.getDescription);
  }
  goToStorePage(){
    this.navCtrl.push(StorePage);
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

  public getStores(): Array<Store>{
    return this.stores;
  }

  public setStores(stores: Array<Store>){
    this.stores = stores;
  }
}
