import { Component } 		from '@angular/core';
// import { AboutPage } 		from '../about/about';
import { ContactPage } 	from '../contact/contact';
import { HomePage } 		from '../home/home';
import { ConvertPage } 		from '../convert/convert';
import { ProfilePage }    from '../profile/profile';
import { LogoutPage } 		from '../logout/logout';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root: any;
  tab2Root = ProfilePage;
  tab3Root = LogoutPage;

  loggedIn = false;

  user_id = window.localStorage.getItem('vg_user_id');

  constructor() {

  	if(!(this.user_id == "" || this.user_id == undefined || this.user_id == null)) {
	    this.loggedIn = true;
      this.tab1Root = ConvertPage;
	  } else {
      this.loggedIn = false;
	  	this.tab1Root = HomePage;
	  }
	  
  }




}
