import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { Config } from '../../config/main'

import { DictionaryPage } from '../dictionary/dictionary';
import { SearchPage } from '../search/search';

declare var $: any;

@IonicPage()
@Component({
  selector: 'page-convert',
  templateUrl: 'convert.html',
})
export class ConvertPage {

	speech: string;
  bgcolor: string;
  api: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private changeDetect: ChangeDetectorRef) {
    this.speech = "Converted text will go here...";
    this.bgcolor = "dark";
    this.api = new Config().getApiEndpoint();
  }

  ionViewDidLoad() {

  	this.speechRecognition.hasPermission()
  		.then((hasPermission: boolean) => {
  			if(!hasPermission) {
  				this.speechRecognition.requestPermission()
  					.then(() =>{
						  console.log("Granted");
						},
						()=>{
						  console.log("Denied");
						})
  			}
  		});

  }

  startListening() {
    this.speech = "";
    this.bgcolor = "custom-bg";
  	this.speechRecognition.startListening()
  		.subscribe((matches: Array<string>)=>{
  			console.log(matches);
  			this.speech += matches[0];
        this.changeDetect.detectChanges();
  		});

  }

  stopListening() {
    this.speechRecognition.stopListening();
    this.bgcolor = "dark";
  }

  clearText() {

    this.speech = "";

  }

  openDictionary() {

    this.navCtrl.push(DictionaryPage);

  }

  openSearch() {

    this.navCtrl.push(SearchPage);

  }

  saveConvertedText() {

    if(this.speech == "") {
      this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Cannot save empty text',
        buttons: [
          'Ok'
        ]
      }).present();

      return;
    }

    let textData = {
      text : this.speech,
      id : window.localStorage.getItem("vg_user_id")
    };

    let loading = this.loadingCtrl.create({
      content: "Saving the converted text..."
    });

    loading.present();

    let lRes;

    $.ajax({
      type: 'POST',
      url: `${this.api}/convert`, //the url to make the call
      data: textData,
      dataType: 'json', //data type to be returned
      success: (result)=>{
        lRes = {
          status: true,
          result: result
        }
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
            subTitle: 'The converted text was successfully saved.',
            buttons: ['Ok']
          });

          alert.present();

          this.speech = "";

        } else {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'There was an error saving the text.',
            buttons: ['Ok']
          });
          alert.present();
        }
      }
    });
  }
}
