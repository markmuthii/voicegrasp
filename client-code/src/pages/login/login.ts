import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ConvertPage } from '../convert/convert';

import { Config } from '../../config/main';

declare var $: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	username: string;
	password: string;
  api: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams, public userProvider: UsersProvider) {
  	this.username = "";
    this.password = "";
    this.api = new Config().getApiEndpoint();
  }

  login(){
  	let userData = {
  		username: this.username,
  		password: this.password
  	}

  	let loading = this.loadingCtrl.create({
  		content: "Logging you in..."
  	});

  	loading.present();

  	// let lRes = this.userProvider.userLogin(userData);

  	let lRes;

  	$.ajax({
      type: 'POST', //type "GET"
      url: `${this.api}/login`, //the url to make the call
      data: userData,
      dataType: 'json', //data type to be returned
      success: (result)=>{
        lRes = {
          status: true,
          result: result
        };
      }, //function to be called upon a successful response //automatically passes the xml data to the function
      error: (err)=>{
        lRes = {
          status: false,
          result: err
        }
      },
      complete: ()=>{
        console.log(lRes);

        loading.dismiss();
        if(lRes.status == true) {
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'You have been successfully logged in.',
            buttons: ['Ok']
          });

          alert.present();


          window.localStorage.setItem("vg_user_id", lRes.result.user_id);
          window.localStorage.setItem("vg_user_firstname", lRes.result.user_firstname);
          window.localStorage.setItem("vg_user_lastname", lRes.result.user_lastname);
          window.localStorage.setItem("vg_user_phonenumber", lRes.result.user_phonenumber);
          window.localStorage.setItem("vg_user_email", lRes.result.user_email);
          window.localStorage.setItem("vg_username", lRes.result.username);

          this.navCtrl.push(ConvertPage);
        } else {
          let errorMessage;
          if (lRes.result.status == 401) {
            errorMessage = lRes.result.responseJSON.message;
          } else {
            errorMessage = "There was an error logging you in. Please check your connection and try again.";
          }
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: errorMessage,
            buttons: ['Ok']
          });
          alert.present();
        }
      }
    });


  } // end login()

}
