import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/main';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var $: any;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

	textData : Array<any>;
	api: any;
	loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private loadingCtrl: LoadingController) {

  	this.api = new Config().getApiEndpoint();

  	this.loading = this.loadingCtrl.create({
  		content: "Retrieving your saved information..."
  	});

  	this.loading.present();

  	this.http.post(`${this.api}/search`, {id : window.localStorage.getItem("vg_user_id")})
  	.subscribe((data)=>{
  		console.log(data);
  		let arr = [];
  		$.each(data, (index, element)=>{

  			arr[index] = {
  				date : element.createdAt.toString().slice(0, 10),
  				text : element.converted_text,
  				id : element.id
  			}
  		});

  		this.textData = arr;
  		this.loading.dismiss();
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  deleteText(textId) {
  	console.log(textId);
  }

}
