import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { ConvertPage } from '../convert/convert';
import{HelpPage} from '../help/help';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_id: any;

  constructor(public navCtrl: NavController) {

  }

  loadLogin(): void {
  	this.navCtrl.push(LoginPage);
  }

  loadSignup(): void {
  	this.navCtrl.push(SignupPage);
  }
loadHelp():void {
  this.navCtrl.push(HelpPage);
}

}
