import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ConvertPage } from '../convert/convert';

import { Config } from '../../config/main';

declare var $: any;
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

	firstname: string;
	lastname: string;
	email: string;
	phonenumber: string;
	username: string;
	password: string;
  api: any;
  loading: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public userProvider: UsersProvider, public loadingCtrl: LoadingController) {
  	this.firstname = "";
  	this.lastname = "";
  	this.email = "";
  	this.phonenumber = "";
  	this.username = "";
  	this.password = "";
    this.api = new Config().getApiEndpoint();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }

  signup(){
  	// console.log(this.firstname);
  	// console.log(this.lastname);
  	// console.log(this.email);
  	// console.log(this.password);

  	let userData = {
  		firstname: this.firstname,
  		lastname: this.lastname,
  		email: this.email,
  		phonenumber: this.phonenumber,
  		username: this.username,
  		password: this.password
  	};

  	// public let userData = new FormData();

  	// userData.append("firstname", this.firstname);
  	// userData.append("lastname", this.lastname);
  	// userData.append("email", this.email);
  	// userData.append("phonenumber", this.phonenumber);
  	// userData.append("username", this.username);
  	// userData.append("password", this.password);

  	this.loading = this.loadingCtrl.create({
  		content: "Signing you up..."
  	});

  	this.loading.present();

  	// this.userProvider.userSignup(userData)
	  // 	.subscribe((res: any) => {
	  // 		loading.dismiss();
	  // 		// window.localStorage.setItem("");  //TO-DO: SAVE TO LOCAL STORAGE
	  // 		this.navCtrl.push(ConvertPage);
	  // 	}, err => {
	  // 		console.log("Error: ", err);
	  // 		loading.dismiss();
	  // 		let alert = this.alertCtrl.create({
   //        title: 'Oops!',
   //        subTitle: 'Sorry, there was an error signing you up',
   //        buttons: ['Ok']
	  //     });

	  //     alert.present();
	  // 	}
	  // 	);
	  // let processSignup = this.userProvider.userSignup(userData);

	  // console.log(processSignup);

	  // if(processSignup.status) {
	  // 	// Signup was successful
	  // 	loading.dismiss();
	  // 	let alert = this.alertCtrl.create({
	  //     title: 'Success',
	  //     subTitle: 'You have been successfully signed up.',
	  //     buttons: ['Ok']
	  //   });

	  // } else {
	  // 	// signup was not successful
	  // 	loading.dismiss();
	  // 	let alert = this.alertCtrl.create({
	  //     title: 'Error',
	  //     subTitle: 'Sorry, there was an error signing you up. Please try again.',
	  //     buttons: ['Ok']
	  //   });
	  // }

	  // alert.present();

    let lRes;

    $.ajax({
      type: 'POST',
      url: `${this.api}/signup`, //the url to make the call
      data: userData,
      dataType: 'json', //data type to be returned
      success: (result)=>{
		    lRes = {
          status: true, result: result
        }
      }, //function to be called upon a successful response //automatically passes the xml data to the function
      error: (err)=>{
        lRes = {
          status: false, result: err
        }
      },
      complete: ()=>{
        console.log(lRes);
        this.loading.dismiss();
        if(lRes.status == true) {
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'You have been successfully signed up.',
            buttons: ['Ok']
          });

          alert.present();

          window.localStorage.setItem("user_id", lRes.result.id);

          this.navCtrl.push(ConvertPage);
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'There was an error signing you up.',
            buttons: ['Ok']
          });
          alert.present();
        }
      }
    });




	  	// loading.dismiss();

  }

  cancelSignup() {
  	this.navCtrl.pop();
  }

}
