import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from '../../model/item';
import { EntryProvider } from '../../providers/entryProvider';
import { StoreProvider } from '../../providers/storeProvider';
import { CityProvider } from '../../providers/cityProvider';
import { UserProvider } from '../../providers/userProvider';
import { Entry } from '../../model/entry';
import { Store } from '../../model/store';
import { City } from '../../model/city';
import { User } from '../../model/user';
import { ItemProvider } from '../../providers/itemProvider';

/*
  Generated class for the RankingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ranking-page, date-pipe, decimal-pipe, currency-pipe',
  templateUrl: 'rankingPage.html',
})

export class RankingPage {
  private items: Array<Item>;
  private rankingEntriesList: Array<Entry>;
  private cities: Array<City>;
  private city: City;
  private store: Store;
  private user: User;
  private itemId: number;
  public isDataAvailable = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider, public userProvider: UserProvider,
              public itemProvider: ItemProvider, public storeProvider: StoreProvider, public cityProvider: CityProvider) {
    this.loadingUser();
    this.loadingItemList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPagePage');
  }

  private loadingUser(){
    this.userProvider.getUserById(1).subscribe(
          data => this.userProvider.fillUser(data),
          err => console.log(err),
          () => {
                  this.setUser(this.userProvider.getUser()); 
                  console.log(this.user);
                  this.loadingCities();
                }
      );
  }

  private loadingCities() {
    this.cityProvider.listCities().subscribe(
          data => this.cityProvider.fillCityList(data),
          err => console.log(err),
          () => {
                  this.setCities(this.cityProvider.getCityList()); 
                  console.log(this.cities);
                }
      );
      this.cityProvider.getCityById(this.user.getIdCity()).subscribe(
          data => this.cityProvider.fillCity(data),
          err => console.log(err),
          () => {
                  this.setCity(this.cityProvider.getCity()); 
                  console.log(this.city);
                }
      );
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
                              this.getRankingEntriesList().sort((a: Entry, b: Entry)=>{
                                return a.getValue() - b.getValue();
                              });
                              for (let entry of this.getRankingEntriesList()){
                                  this.loadingStore(entry);
                              }
                              this.isDataAvailable = true;
                            }
                  );
  }

  private loadingStore(entry: Entry) {
    this.storeProvider.getStoreById(entry.getStoreId()).subscribe(
          data => this.storeProvider.fillStore(data),
          err => console.log(err),
          () => {
                  this.setStore(this.storeProvider.getStore()); 
                  console.log(this.store);
                  entry.setStoreName(this.store.getName());
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

  public getStore(): Store{
    return this.store;
  }

  public setStore(store: Store){
    this.store = store;
  }

  public getUser(): User{
    return this.user;
  }

  public setUser(user: User){
    this.user = user;
  }

  public getCities(): Array<City>{
    return this.cities;
  }

  public setCities(cities: Array<City>){
    this.cities = cities;
  }
  
  public getCity(): City{
    return this.city;
  }

  public setCity(city: City){
    this.city = city;
  }

}
