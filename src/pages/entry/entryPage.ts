import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/itemProvider';
import { EntryProvider } from '../../providers/entryProvider';
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
  templateUrl: 'EntryPage.html'
})
  export class EntryPage {
  private entry: Entry;
  private category: Category;
  private items: Array<Item>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider, public entryProvider: EntryProvider) {
    this.entry = new Entry(null, "", "", null, null);
    console.log("EntryPage constructor");

    this.fillCategoryParam(navParams);
    this.loadingItemList();
 }

 private fillCategoryParam(navParams: NavParams){
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
