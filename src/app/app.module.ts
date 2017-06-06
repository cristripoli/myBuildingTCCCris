import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, NgModule, ErrorHandler } from '@angular/core';
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
import { StoreProvider } from '../providers/storeProvider';
import { CityProvider } from '../providers/cityProvider';
import { StateProvider } from '../providers/stateProvider';
import { UserProvider } from '../providers/userProvider';
import { CategoryService } from '../services/categoryService';
import { BuildingService } from '../services/buildingService';
import { EntryService } from '../services/entryService';
import { ItemService } from '../services/itemService';
import { BuildingCalcService } from '../services/buildingCalcService';
import { CityService } from '../services/cityService';
import { StoreService } from '../services/storeService';
import { StateService } from '../services/stateService';
import { UserService } from '../services/userService';
import { EntryPage } from '../pages/entry/entryPage';
import { ItemPage } from '../pages/item/itemPage';
import { ItemListPage } from '../pages/item/itemListPage';
import { EntryListPage } from '../pages/entry/entryListPage';
import { StorePage } from '../pages/store/storePage';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ReportsPage } from '../pages/reports/reportsPage';
import { ReportsByMonthPage } from '../pages/reports/reportsByMonthPage';
import { RankingPage } from '../pages/ranking/rankingPage';

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
    ReportsByMonthPage,
    StorePage,
    RankingPage,
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
    ReportsByMonthPage,
    StorePage,
    RankingPage,
    Building,
    Settings,
    About
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-br' },
    CategoryProvider,
    CategoryService,
    EntryProvider,
    EntryService,
    ItemProvider,
    CityProvider,
    StateProvider,
    UserProvider,
    StoreProvider,
    ItemService,
    BuildingProvider,
    BuildingService,
    BuildingCalcService,
    StoreService,
    UserService,
    CityService,
    StateService
    ]
})
export class AppModule {}
