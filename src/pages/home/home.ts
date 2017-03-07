import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  public doughnutChartLabels:string[] = ['Mão de Obra', 'Documentação', 'Materiais-Order Sales', 'Outros'];
  public doughnutChartData:number[] = [350, 450, 100, 200];
  public doughnutChartType:string = 'doughnut';
  
  selectedItem: any;
  icons: string[];
  titles: string[];
  values: string[];
  items: Array<{title: string, note: string, icon: string}>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['construct', 'paper', 'pricetags', 'medical', 'stats'];

    this.titles = ['Mão de Obra', 'Documentação', 'Materiais', 'Outros', 'Orçamento Previsto'];

    this.items = [];
    for (let i = 0; i < this.icons.length; i++) {
      this.items.push({
        title: this.titles[i],
        note: '$' + i,
        icon: this.icons[i]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Home, {
      item: item
    });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
