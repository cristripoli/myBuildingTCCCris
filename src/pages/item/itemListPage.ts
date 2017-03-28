import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { EntryListPage } from '../entry/entryListPage'
import { ItemPage } from '../item/itemPage'

/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-page',
  templateUrl: 'itemListPage.html'
})
export class ItemListPage {
  private items: Array<Item>;
  private category: Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider) {
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
                              console.log(this.items);
                            }
                  );
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
}
