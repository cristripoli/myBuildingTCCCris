import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { EntryListPage } from '../entry/entryListPage'

/*
  Generated class for the ItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-item-page',
  templateUrl: 'itemPage.html'
})
export class ItemPage {
  private items: Array<Item>;
  private category: Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider) {
    console.log("ItemPage constructor");

    this.fillCateogoryParam(navParams);
    this.loadingItemList();
  }

  private fillCateogoryParam(navParams: NavParams){
    this.category = new Category(null,"","","");
    console.log(navParams);
    this.category.setId(navParams.get('id'));
    this.category.setName(navParams.get('name'));
    this.category.setDescription(navParams.get('description'));
    this.category.setIcon(navParams.get('icon'));
    this.category.setTotal(navParams.get('total'));

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

  public getItems(): Array<Item>{
    return this.items;
  }

  public setItems(items: Array<Item>){
    this.items = items;
  }
}
