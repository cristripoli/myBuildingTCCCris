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
import { BuildingProvider } from '../providers/buildingProvider';
import { CategoryService } from '../services/categoryService';
import { BuildingService } from '../services/buildingService';
import { EntryService } from '../services/entryService';
import { ItemService } from '../services/itemService';
import { BuildingCalcService } from '../services/buildingCalcService';
import { EntryPage } from '../pages/entry/entryPage';
import { ItemPage } from '../pages/item/itemPage';
import { ItemListPage } from '../pages/item/itemListPage';
import { EntryListPage } from '../pages/entry/entryListPage';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ReportsPage } from '../pages/reports/reportsPage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoryPage,
    EntryPage,
    ItemPage,
    ItemListPage,
    EntryListPage,
    Building,
    Settings,
    ReportsPage,
    About,
    ProgressBarComponent
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
    ItemListPage,
    EntryListPage,
    ReportsPage,
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
    ItemService,
    BuildingProvider,
    BuildingService,
    BuildingCalcService
    ]
})
export class AppModule {}
