import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { EntryProvider } from '../../providers/entryProvider';
import { Item } from '../../model/item';
import { Entry } from '../../model/entry';
import { Category } from '../../model/category';
import { EntryListPage } from '../entry/entryListPage'
import { ItemPage } from '../item/itemPage'
import { BuildingCalcService } from '../../services/buildingCalcService';

/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-page, currency-pipe, decimal-pipe',
  templateUrl: 'itemListPage.html'
})
export class ItemListPage {
  private items: Array<Item>;
  private entries: Array<Entry>;
  private category: Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider, 
              public events: Events, public calcService: BuildingCalcService, public entryProvider: EntryProvider) {
    console.log("ItemPage constructor");

    this.fillCategoryParam(navParams);
    this.loadingItemList();
  }

  private fillCategoryParam(navParams: NavParams){
    this.category = new Category(null,"","","");
    console.log(navParams);
    this.category = navParams.data;

    console.log("category: " + this.category);
  }

  private loadingItemList() {
    this.itemProvider.listItemsByCategory(this.category.getId()).subscribe(
                      data => this.itemProvider.fillItemList(data),
                      err => console.log(err),
                      () => {
                              this.setItems(this.itemProvider.getItemList());
                              this.loadingEntriesByItem();
                              console.log(this.items);
                            }
                  );
  }

  private loadingEntriesByItem() {
    for(let item of this.items){
      this.entryProvider.listEntriesByItem(item.getId()).subscribe(  // update list after pop page
                      data => this.entryProvider.fillEntryList(data),
                      err => console.log(err),
                      () => {
                              item.setTotal(0.0);
                              this.setEntries(this.entryProvider.getEntryList()); 
                              this.calcTotalByItem(item);
                              console.log(this.entries);
                            }
            );
      }  
  }

  private calcTotalByItem(item: Item) {
    for(let entry of this.entries){
      this.entryProvider.listEntriesByItem(item.getId()).subscribe(
                      data => this.entryProvider.fillEntryList(data),
                      err => console.log(err),
                      () => {
                              this.setEntries(this.entryProvider.getEntryList()); 
                              item.setTotal(this.calcService.sumTotalSpent(this.entries));
                              console.log(this.entries);
                            }
            );
    }  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPagePage');
  }

  showEntriesByItem(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EntryListPage, item);
  }

  goToItemPage(){
    this.navCtrl.push(ItemPage, this.category);
  }

  public getItems(): Array<Item>{
    return this.items;
  }

  public setItems(items: Array<Item>){
    this.items = items;
  }

  public setEntries(entries: Array<Entry>){
    this.entries = entries;
  }
  // update list after pop page
  ionViewDidEnter(){
    this.loadingItemList();
  }
}
