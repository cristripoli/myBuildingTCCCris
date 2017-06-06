import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entryProvider';
import { StoreProvider } from '../../providers/storeProvider';
import { Entry } from '../../model/entry';
import { Store } from '../../model/store';
import { SpentByMonth } from '../../model/spentByMonth';
import { BuildingCalcService } from '../../services/buildingCalcService';
import { MonthEnum } from '../../enum/monthEnum';
import { UtilService } from '../../services/utilService';

/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports-by-month, decimal-pipe, currency-pipe',
  templateUrl: 'reportsByMonthPage.html'
})
export class ReportsByMonthPage {
  private entries: Array<Entry>;
  private stores: Array<Store>;
  private spentByMonthList: Array<SpentByMonth>;
  private spentByStoreList: Array<SpentByMonth>;
  public isDataAvailable = false;
  public isDataByStoreAvailable = false;
  public estimatedValue: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider,
             public calcService: BuildingCalcService, public storeProvider: StoreProvider) {
    this.entries = new Array<Entry>();
    this.spentByMonthList = new Array<SpentByMonth>();
    this.spentByStoreList = new Array<SpentByMonth>();
    this.estimatedValue = navParams.data;
    this.loadingStores();
    this.loadingTotalSpentByMonth((callback) => {
                                });
  }

  private loadingStores() {
    this.storeProvider.listStores().subscribe(
          data => this.storeProvider.fillStoreList(data),
          err => console.log(err),
          () => {
                  this.setStores(this.storeProvider.getStoreList()); 
                  console.log(this.stores);
                  this.loadingTotalSpentByStore((callback) => {
                                });
                }
      );
  }
  private loadingTotalSpentByMonth(callback) {
      let spentByMonth: SpentByMonth;
      for(let i = 1; i <= 12; i ++){
        this.entryProvider.listEntriesByMonth(i).subscribe(
        data => this.entryProvider.fillEntryList(data),
        err => console.log(err),
        () => {
                  let month = UtilService.getEnumString(MonthEnum, MonthEnum["MONTH_" + i]);
                  this.entries = this.entryProvider.getEntryList();
                  let totalByMonth = this.calcService.sumTotalSpent(this.entries);
                  spentByMonth = new SpentByMonth(month, totalByMonth, this.calcService.calculatePercent(totalByMonth, this.estimatedValue),
                                 this.calcService.getTotalSpentPaid(), this.calcService.getTotalSpentNotPaid());
                  this.spentByMonthList.push(spentByMonth);
                  console.log(this.spentByMonthList);
              }
        );
      }
      setTimeout(() => {
          return this.isDataAvailable = true;
      });
    }

    private loadingTotalSpentByStore(callback) {
      let spentByStore: SpentByMonth;

      for(let store of this.getStores()){
        this.entryProvider.listEntriesByStore(store.getId()).subscribe(
        data => this.entryProvider.fillEntryList(data),
        err => console.log(err),
        () => {
                  this.entries = this.entryProvider.getEntryList();
                  let totalByStore = this.calcService.sumTotalSpent(this.entries);
                  spentByStore = new SpentByMonth(store.getName(), totalByStore, this.calcService.calculatePercent(totalByStore, this.estimatedValue),
                                 this.calcService.getTotalSpentPaid(), this.calcService.getTotalSpentNotPaid());
                  this.spentByStoreList.push(spentByStore);
                  console.log(this.spentByStoreList);
              }
        );
      }
      setTimeout(() => {
          return this.isDataByStoreAvailable = true;
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

  public getSpentByMonthList(): Array<SpentByMonth>{
    return this.spentByMonthList;
  }

  public setSpentByMonthList(spentByMonthList: Array<SpentByMonth>){
    this.spentByMonthList = spentByMonthList;
  }

  public getSpentByStoreList(): Array<SpentByMonth>{
    return this.spentByStoreList;
  }

  public setSpentByStoreList(spentByStoreList: Array<SpentByMonth>){
    this.spentByStoreList = spentByStoreList;
  }

  public getStores(): Array<Store>{
    return this.stores;
  }

  public setStores(stores: Array<Store>){
    this.stores = stores;
  }
}
