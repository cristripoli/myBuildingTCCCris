import { Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { CategoryProvider } from '../../providers/categoryProvider';
import { EntryProvider } from '../../providers/entryProvider';
import { BuildingProvider } from '../../providers/buildingProvider';
import { BuildingCalcService } from '../../services/buildingCalcService';
import { Category } from '../../model/category';
import { Entry } from '../../model/entry';
import { Building } from '../../model/building';
import { EntryPage } from '../entry/entryPage';
import { ItemListPage } from '../item/itemListPage';
import { ReportsByMonthPage } from '../reports/reportsByMonthPage';
import { RankingPage } from '../ranking/rankingPage';

@Component({
  selector: 'page-home, decimal-pipe, currency-pipe, percent-pipe',
  templateUrl: 'homePage.html'
})
export class HomePage {

   @ViewChild('categoryCanvas') categoryCanvas;
   categoryChart: any;

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public isDataAvailable = false;
  public showDetailsFinacial = false;
  public loadProgress = 0;
  public categories: Array<Category>;
  public building: Building;
  public totalSpent: number = 0;
  public balance: number = 0;
  public valueMeterEstimated: number = 0;
  public valueMeterActual: number = 0;

 constructor(public navCtrl: NavController, public categoryProvider: CategoryProvider, public entryProvider: EntryProvider,
             public buildingProvider: BuildingProvider, public calcService: BuildingCalcService) {
    this.loadingBuilding();
    this.loadingCategoryList();
    console.log(this.categories);
 }

  public loadChart() {
      this.categoryChart = new Chart(this.categoryCanvas.nativeElement, {

                 type: 'doughnut',
                 data: {
                     labels: this.doughnutChartLabels,
                     datasets: [{
                         label:this.doughnutChartLabels,
                         data: this.doughnutChartData,
                         backgroundColor: [
                             'rgba(128, 0, 128, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(255, 165, 0, 0.2)'
                         ],
                         hoverBackgroundColor: [
                             '#800080',
                             "#36A2EB",
                             "#FF6384",
                             '#FF8C00'
                         ]
                     }]
                 }
             });
}



 private loadingBuilding(){
    this.buildingProvider.getBuildingById(1).subscribe(
            data => this.buildingProvider.fillBuilding(data),
            err => console.log(err),
            () => {
                   this.building = this.buildingProvider.getBuilding();
                  }
        );
 }

 private loadingCategoryList() {
    this.categoryProvider.listCategories().subscribe(
                       data => this.categoryProvider.fillCategoryList(data),
                        err => console.log(err),
                        () => {
                               this.loadingTotalSpentByCategory((callback) => {
                                });
                              }
                    );
  }

  private loadingTotalSpentByCategory(callback) {
    this.categories = this.categoryProvider.getCategoryList();
    for(let category of this.categories){
      this.entryProvider.listEntriesByCategory(category.getId()).subscribe(
                        data => this.entryProvider.fillEntryList(data),
                          err =>{
                           console.log(err),
                           category.setTotal(0);
                          },
                          () => {
                                  category.setTotal(this.calcService.sumTotalSpent(this.entryProvider.getEntryList()));
                                  console.log("category: " + category);
                                  this.totalSpent += category.getTotal();
                                  this.loadingChartInfo(category);
                                }
                      );
    }

    setTimeout(() => {
       this.setLoadProgress(this.calcService.calculateEstimatedValueProgress(this.building.getEstimatedValue()));
       this.balance = this.building.getEstimatedValue() - this.totalSpent;
       this.valueMeterActual = this.calcService.calculateValueByMeter(this.totalSpent, this.building.getMetreage());
       this.valueMeterEstimated = this.calcService.calculateValueByMeter(this.building.getEstimatedValue(), this.building.getMetreage());
       return this.isDataAvailable = true;
    });
  }

  private loadingChartInfo(category: Category) {
    this.doughnutChartLabels.push(category.getName());
    this.doughnutChartData.push(category.getTotal())
    this.loadChart();
    console.log("labels: "+this.doughnutChartLabels);
    console.log("data: "+this.doughnutChartData);
  }

  goToEntryPage(category: Category){
         console.log("Category: " + category.getName());
         this.navCtrl.push(EntryPage, {"category": category});
  }

  goToItemList(event, category) {
    this.navCtrl.push(ItemListPage, category);
  }

  goToRankingPage(event, category) {
    this.navCtrl.push(RankingPage, this.building);
  }
  
  public goToReports(){
    this.navCtrl.push(ReportsByMonthPage, this.building.getEstimatedValue());
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  public showDetails(){
    this.showDetailsFinacial = !this.showDetailsFinacial;
  }

  getLoadProgress() : number{
      return this.loadProgress;
  }

  setLoadProgress(loadProgress: number){
      this.loadProgress = loadProgress;
  }

  getCategories() : Array<Category>{
      return this.categories;
  }

  setCategories(categories: Array<Category>){
      this.categories = categories;
  }


  getDoughnutChartLabels() : Array<string>{
      return this.doughnutChartLabels;
  }

  setDoughnutChartLabels(doughnutChartLabels: Array<string>){
      this.doughnutChartLabels = doughnutChartLabels;
  }

  getDoughnutChartData() : Array<number>{
      return this.doughnutChartData;
  }

  setDoughnutChartData(doughnutChartData: Array<number>){
      this.doughnutChartData = doughnutChartData;
  }
}
