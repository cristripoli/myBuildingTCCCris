import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Category } from '../pages/category/category';
import { Building } from '../pages/building/building';
import { Settings } from '../pages/settings/settings';
import { About } from '../pages/about/about';
import { ChartsModule } from 'ng2-charts';
import { CategoryProvider } from '../providers/categoryProvider';
import { EntryProvider } from '../providers/entryProvider';
import { CategoryService } from '../services/categoryService';
import { EntryService } from '../services/entryService';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Category,
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
    Home,
    Category,
    Building,
    Settings,
    About
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    CategoryService,
    EntryProvider,
    EntryService]
})
export class AppModule {}
