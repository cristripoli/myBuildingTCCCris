import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CategoryProvider } from '../../providers/categoryProvider';
import { Category } from '../../model/category';

@Component({
  selector: 'page-category',
  templateUrl: 'categoryPage.html'
})
export class CategoryPage {
  selectedItem: any;
  categories: Array<Category>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryProvider: CategoryProvider,) {
    this.loadingCategoryList();
    console.log(this.categories);
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

 private loadingCategoryList() {
    this.categoryProvider.listCategories().subscribe(
                       data => this.categoryProvider.fillCategoryList(data),
                        err => console.log(err),
                        () => {
                               this.categories = this.categoryProvider.getCategoryList();
                              }
                    );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Category, {
      item: item
    });
  }
}
