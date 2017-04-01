import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entryProvider';
import { Entry } from '../../model/entry';
import { SpentByMonth } from '../../model/spentByMonth';
import { BuildingCalcService } from '../../services/buildingCalcService';

/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports-by-month',
  templateUrl: 'reportsByMonthPage.html'
})
export class ReportsByMonthPage {
  private entries: Array<Entry>;
  private spentByMonthList: Array<SpentByMonth>;
  public isDataAvailable = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider, public calcService: BuildingCalcService) {
    this.entries = new Array<Entry>();
    this.spentByMonthList = new Array<SpentByMonth>();
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
                  this.entries = this.entryProvider.getEntryList();
                  spentByMonth = new SpentByMonth(""+i+"",this.calcService.sumTotalSpent(this.entries),null);
                  this.spentByMonthList.push(spentByMonth);
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
