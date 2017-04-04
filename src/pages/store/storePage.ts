import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StoreProvider } from '../../providers/storeProvider';
import { CityProvider } from '../../providers/cityProvider';
import { StateProvider } from '../../providers/stateProvider';
import { City } from '../../model/city';
import { Store } from '../../model/store';
import { State } from '../../model/state';
import { EntryPage } from '../entry/entryPage';

/*
  Generated class for the Store page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-store',
  templateUrl: 'storePage.html'
})
export class StorePage {

  public cities: Array<City>;
  public states: Array<State>;
  public store: Store;
  public stateId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeProvider: StoreProvider,
              public stateProvider: StateProvider, public cityProvider: CityProvider) {
      this.store = new Store(null,"",null);
      this.loadingStates();
  }
  
  private loadingStates(){
      this.stateProvider.listStates().subscribe(
              data => this.stateProvider.fillStateList(data),
              err => console.log(err),
              () => {
                    this.states = this.stateProvider.getStateList();
                    }
          );
  }
 
  private loadingCities() {
    this.cityProvider.listCitiesByState(this.stateId).subscribe(
                       data => this.cityProvider.fillCityList(data),
                        err => console.log(err),
                        () => {
                              this.cities = this.cityProvider.getCityList();
                              }
                    );
  }

  loadCities(stateId){
    console.log(stateId);
    this.setStateId(stateId);
    this.loadingCities();
  }

  saveStore(store: Store){
    this.storeProvider.saveStore(store);
    this.back();
  }

  back(){
    this.navCtrl.push(EntryPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }
  getStates() : Array<State>{
      return this.states;
  }

  setStates(states: Array<State>){
    this.states = states;
  }

  getCities() : Array<City>{
      return this.cities;
  }

  setCities(cities: Array<City>){
    this.cities = cities;
  }

  getStateId() : number{
      return this.stateId;
  }
  setStateId(stateId: number){
    this.stateId = stateId;
  }

}
