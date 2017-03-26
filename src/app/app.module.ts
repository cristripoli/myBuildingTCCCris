import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/homePage';
import { CategoryPage } from '../pages/category/categoryPage';
import { Building } from '../pages/building/building';
import { Settings } from '../pages/settings/settings';
import { About } from '../pages/about/about';
import { ChartsModule } from 'ng2-charts';
import { CategoryProvider } from '../providers/categoryProvider';
import { EntryProvider } from '../providers/entryProvider';
import { ItemProvider } from '../providers/itemProvider';
import { CategoryService } from '../services/categoryService';
import { EntryService } from '../services/entryService';
import { ItemService } from '../services/itemService';
import { EntryPage } from '../pages/entry/entryPage';
import { ItemPage } from '../pages/item/itemPage';
import { EntryListPage } from '../pages/entry/entryListPage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoryPage,
    EntryPage,
    ItemPage,
    EntryListPage,
    Building,
    Settings,
    About
  ],
  imports: [
    ChartsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryPage,
    EntryPage,
    ItemPage,
    EntryListPage,
    Building,
    Settings,
    About
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    CategoryService,
    EntryProvider,
    EntryService,
    ItemProvider,
    ItemService
    ]
})
export class AppModule {}
