import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import{HttpClient} from '@angular/common/http';
import { Config } from '../../config/main';
import {Platform} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  firstname : any;
  lastname : any;
  email : any;
  phonenumber : any;
  username : any;
  api: any;
  loggedIn : any;
  user_id ; any;
  loading: any;

  constructor(public platform: Platform, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.user_id = window.localStorage.getItem('vg_user_id');
    if(!(this.user_id == "" || this.user_id == undefined || this.user_id == null)) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.api = new Config().getApiEndpoint();
    this.firstname = window.localStorage.getItem("vg_user_firstname");
    this.lastname = window.localStorage.getItem("vg_user_lastname");
    this.email = window.localStorage.getItem("vg_user_email");
    this.phonenumber = window.localStorage.getItem("vg_user_phonenumber");
    this.username = window.localStorage.getItem("vg_username");
  }


  ionViewDidLoad() {
    this.user_id = window.localStorage.getItem('vg_user_id');
    if(!(this.user_id == "" || this.user_id == undefined || this.user_id == null)) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    console.log('ionViewDidLoad ProfilePage');
  }


  Update() {

    this.loading = this.loadingCtrl.create({
      content: "Updating your profile..."
    });

    this.loading.present();

    this.http.post(`${this.api}/update`, {
      firstname : this.firstname,
      lastname : this.lastname,
      phonenumber : this.phonenumber,
      email : this.email,
      username : this.username,
      id : window.localStorage.getItem("user_id")
      })
    .subscribe((data)=>{
      console.log(data);

      this.loading.dismiss();

      let alert = this.alertCtrl.create({
        subTitle: "Update Complete",
        buttons: ['Ok']
      });

      alert.present();
    });
  }

  logout(){

    this.loading = this.loadingCtrl.create({
          content: "Logging you out..."
        });

    this.loading.present();

    setTimeout(()=>{
      this.loading.dismiss();
    }, 4000);
    

    window.localStorage.removeItem("vg_user_id");
    window.localStorage.removeItem("vg_user_firstname");
    window.localStorage.removeItem("vg_user_lastname");
    window.localStorage.removeItem("vg_user_phonenumber");
    window.localStorage.removeItem("vg_user_email");
    window.localStorage.removeItem("vg_username");

    this.platform.exitApp();
  }

}
