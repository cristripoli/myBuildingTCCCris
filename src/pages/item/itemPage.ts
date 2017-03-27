import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { ItemListPage } from '../item/itemListPage'

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
  private item: Item;
  private category: Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider) {
    console.log("ItemPage constructor");
    this.item = new Item(null,"","",null);

    this.fillCategoryParam(navParams);
  }

  private fillCategoryParam(navParams: NavParams){
    this.category = new Category(null,"","","");
    console.log(navParams);
    this.category = navParams.data;
    this.item.setCategoryId(this.category.getId());
    console.log("category: " + this.category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPagePage');
  }

  private saveItem(item: Item){
    this.itemProvider.saveItem(item);
    this.back();
  }

  back(){
    this.navCtrl.push(ItemListPage);
  }

  public getItem(): Item{
    return this.item;
  }

  public setItem(item: Item){
    this.item = item;
  }
}
