import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item';
import { EntryProvider } from '../../providers/entryProvider';
import { Entry } from '../../model/entry';
import { ItemProvider } from '../../providers/itemProvider';
import { OrderByPipe } from '../../pipes/orderByPipe';

/*
  Generated class for the RankingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ranking-page',
  templateUrl: 'rankingPage.html',
  pipes: [OrderByPipe]
})
export class RankingPage {
  private items: Array<Item>;
  private rankingEntriesList: Array<Entry>;
  private itemId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider, public itemProvider: ItemProvider,) {
    this.loadingItemList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPagePage');
  }

  private loadingItemList() {
    this.itemProvider.listItems().subscribe(
          data => this.itemProvider.fillItemList(data),
          err => console.log(err),
          () => {
                  this.setItems(this.itemProvider.getItemList()); 
                  console.log(this.items);
                }
      );
  }

  private loadingEntryListByItem() {
    this.entryProvider.listEntriesByItem(this.itemId).subscribe(
                      data => this.entryProvider.fillEntryList(data),
                      err => console.log(err),
                      () => {
                              this.setRankingEntriesList(this.entryProvider.getEntryList()); 
                              console.log(this.setRankingEntriesList);
                            }
                  );
  }

  loadRaking($event, itemId){
    this.loadingEntryListByItem();
  }

  public getRankingEntriesList(): Array<Entry>{
    return this.rankingEntriesList;
  }

  public setRankingEntriesList(entries: Array<Entry>){
    this.rankingEntriesList = entries;
  }

  public getItems(): Array<Item>{
    return this.items;
  }

  public setItems(items: Array<Item>){
    this.items = items;
  }


}
