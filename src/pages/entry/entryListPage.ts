import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entryProvider';
import { Entry } from '../../model/entry';
import { Item } from '../../model/item';
import { Category } from '../../model/category';
import { HomePage } from '../home/homePage';
import { EntryPage } from '../entry/entryPage';

/*
  Generated class for the Entry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entry',
  templateUrl: 'entryListPage.html'
})
  export class EntryListPage {
  private entries: Array<Entry>;
  private category: Category;
  private item: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider) {
   
    console.log("EntryPage constructor");

    this.fillItemParam(navParams);

    this.loadingEntryList();
 }

 private fillItemParam(navParams: NavParams){
    this.item = new Item(null,"","",null);
    console.log(navParams);
    this.item = navParams.data;
    console.log("item: " + this.item);
  }

  private loadingEntryList() {
    this.entryProvider.listEntriesByItem(this.item.getId()).subscribe(
                      data => this.entryProvider.fillEntryList(data),
                      err => console.log(err),
                      () => {
                              this.setEntries(this.entryProvider.getEntryList()); 
                              console.log(this.entries);
                            }
                  );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  goToEntryPage(){
    this.navCtrl.push(EntryPage, {"item": this.item});
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  public getCategory(): Category{
    return this.category;
  }

  public setCategory(category: Category){
    this.category = category;
  }

  public getEntries(): Array<Entry>{
    return this.entries;
  }

  public setEntries(entries: Array<Entry>){
    this.entries = entries;
  }
}
