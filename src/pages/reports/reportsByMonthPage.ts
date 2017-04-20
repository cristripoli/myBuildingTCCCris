import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entryProvider';
import { Entry } from '../../model/entry';
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
  private spentByMonthList: Array<SpentByMonth>;
  public isDataAvailable = false;
  public estimatedValue: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider, public calcService: BuildingCalcService) {
    this.entries = new Array<Entry>();
    this.spentByMonthList = new Array<SpentByMonth>();
    this.estimatedValue = navParams.data;
    this.loadingTotalSpentByMonth((callback) => {
                                });
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
                  spentByMonth = new SpentByMonth(month, totalByMonth, this.calcService.calculatePercent(totalByMonth, this.estimatedValue));
                  this.spentByMonthList.push(spentByMonth);
                  console.log(this.spentByMonthList);
              }
        );
      }
      setTimeout(() => {
          return this.isDataAvailable = true;
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
}
