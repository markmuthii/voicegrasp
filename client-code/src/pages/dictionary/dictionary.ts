import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

declare let $: any;

@IonicPage()
@Component({
  selector: 'page-dictionary',
  templateUrl: 'dictionary.html',
})
export class DictionaryPage {

	searchWord: string;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    // this.loading = "";
  }

  ionViewDidLoad() {

  }

  searchDictionary() {
  	console.log(this.searchWord);

  	this.loading = this.loadingCtrl.create({
      content: `Searching for ${this.searchWord}...`
    });

  	this.loading.present();

    let searchWord = this.searchWord;

    searchWord = searchWord.toLowerCase();

    searchWord = this.removeEndSpaces(searchWord);

    searchWord = this.removeFrontSpaces(searchWord);

    let encodedSearchWord = encodeURIComponent(searchWord);

    let merKey = '3199599e-55e7-4f2d-8401-b0f94267520b';

    let baseUrl = 'https://www.dictionaryapi.com/api/v1/references/collegiate/xml/';

    let fullApiUrl = baseUrl + encodedSearchWord + '?key=' + merKey;

    $.ajax({
      type: 'GET',
      url: fullApiUrl,
      dataType: 'xml',
      success: this.traverseXML,
      error: this.ajaxError,
      complete: ()=>{this.loading.dismiss();}
    });
  }


  removeEndSpaces(word) {
    let arrWord = word.split('');
    for (let i = arrWord.length - 1; i >= 0; i--) {
      if (arrWord[i] != ' ') {
        return word;
      }else{
        word = word.slice(0, i);
      }
    }
  }


  removeFrontSpaces(word){
    let arrWord = word.split('');
    for (let i = 0; i < arrWord.length; i++){
      if (arrWord[i] == ' ') {
        continue;
      }else{
        word = word.slice(i, arrWord.length);
        return word;
      }
    }
  }

  traverseXML(data) {
    console.log(data);
    let entry = $(data).find('entry');
    let result = $('div#results');
    if(result.text() != "") {
      result.text("");
    }
    let def = $(entry[0]).find('def').first()[0];
    if (typeof def == 'undefined') {
      result.text("");
      result.append(`
        <div class="error missing-word">
          <p class="text-center">Sorry, that word does not exist in our database</p>
        </div>
      `);
      $('ion-list#resultsContainer').removeClass('hidden');
      // this.loading.dismiss();
      return;
    }
    def = def.innerHTML;
    result.append(def);
    // this.filterResult(result);
    let dt = result.find('dt');

    result.text("");

    $.each(dt, (i, e) => {
      result.append(`
        <p>${e.innerHTML}</p>
      `);
    });
    // loading.dismiss();
    $('ion-list#resultsContainer').removeClass('hidden').fadeIn();
  }

  // filterResult(result) {

  //   let dt = result.find('dt');

  //   result.text("");

  //   $.each(dt, (i, e) => {
  //     result.append(`
  //       <p>${e.innerHTML}</p>
  //     `);
  //   });
  //   // loading.dismiss();
  //   $('div#resultsContainer').removeClass('hidden').fadeIn();
  // }


  ajaxError(err){
    let result = $('div#results');
    result.text("");
    result.append(`
      <div class="error ajax text-center">
        <p>There was an error processing your request.</p>
        <p>Please check your connection and try again.</p>
      </div>
    `);

    // loading.dismiss();
    $('div#resultsContainer').removeClass('hidden');
  }



}
