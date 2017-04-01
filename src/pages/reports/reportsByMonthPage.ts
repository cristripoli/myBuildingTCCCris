import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntryProvider } from '../../providers/entryProvider';
import { Entry } from '../../model/entry';
import { SpentByMonth } from '../../model/spentByMonth';

/*
  Generated class for the Reports page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reports-by-month',
  templateUrl: 'reportsByMonthPage.html'
})
export class ReportsPage {
  private entries: Array<Entry>;
  private spentByMonth: Array<SpentByMonth>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public entryProvider: EntryProvider) {}

  private loadingTotalSpentByCategory(callback) {
      this.entryProvider.listEntries().subscribe(
            data => this.entryProvider.fillEntryList(data),
            err => console.log(err),
            () => {
                      this.entries = this.entryProvider.getEntryList(); 
                    }
          );
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }

}
