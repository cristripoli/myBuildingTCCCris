import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NavController } from 'ionic-angular';
import { CategoryProvider } from '../../providers/categoryProvider';
import { EntryProvider } from '../../providers/entryProvider';
import { Category } from '../../model/category';
import { Entry } from '../../model/entry';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  inputs:['doughnutChartData']
})
export class Home {
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public isDataAvailable = false;
  
  selectedItem: any;
  categories: Array<Category>;
  

 constructor(public navCtrl: NavController, public categoryProvider: CategoryProvider, public entryProvider: EntryProvider) {
    this.loadingCategoryList();
    console.log(this.categories);
        console.log(this.doughnutChartLabels);
            console.log(this.doughnutChartData);
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
                          err => console.log(err),
                          () => {
                                 category.setTotal(this.sumTotalSpentByCategory(this.entryProvider.getEntryList())); 
                                 console.log("category: " + category);
                                 this.loadingChartInfo(category);
                                }
                      );
      }

      setTimeout(() => {
            return this.isDataAvailable = true;
      });
    }

  private loadingChartInfo(category: Category) {
    this.doughnutChartLabels.push(category.getName());
    this.doughnutChartData.push(category.getTotal())
    console.log("labels: "+this.doughnutChartLabels);
    console.log("data: "+this.doughnutChartData);
  }

  private sumTotalSpentByCategory(entries: Array<Entry>) {
    let total = 0;
    for(let entry of entries){
        total += entry.getValue();
      }

    console.log("Total: " + total);
    return total;
  }

  itemTapped(event, category) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Home, {
      category: category
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
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
