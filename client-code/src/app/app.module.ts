import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { DictionaryPage } from '../pages/dictionary/dictionary';
import { ConvertPage } from '../pages/convert/convert';
import { ProfilePage } from '../pages/profile/profile';
import { HelpPage } from '../pages/help/help';
import { LogoutPage } from '../pages/logout/logout';

import { StatusBar } from '@ionic-native/status-bar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider } from '../providers/users/users';
import { TextProvider } from '../providers/text/text';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    SearchPage,
    DictionaryPage,
    ConvertPage,
    ProfilePage,
    TabsPage,
    HelpPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SignupPage,
    SearchPage,
    DictionaryPage,
    ConvertPage,
    ProfilePage,
    TabsPage,
    HelpPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    TextProvider
  ]
})
export class AppModule {}
