import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPage } from '../pages/add/add';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { CompletedTasksPage } from '../pages/completed-tasks/completed-tasks';
import { IonicStorageModule } from '@ionic/storage';
import { TodoProvider } from '../providers/todo/todo';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    SearchPage,
    TabsPage,
    CompletedTasksPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    SearchPage,
    TabsPage,
    CompletedTasksPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoProvider,
    DatePipe
  ]
})
export class AppModule {}
