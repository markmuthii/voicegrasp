import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config/main';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
declare var $: any;
/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  
  api: any;

  constructor(public http: HttpClient) {
    this.api = new Config().getApiEndpoint();
    console.log('Hello UsersProvider Provider');
  }

  // userLogin(userData){
  // 	return new Promise(resolve => {
  // 		let headers = new HttpHeaders();
  // 		headers.append("Content-Type", "application/json");
  // 		this.http.post(`${this.api}/login`, userData, {headers: headers})
  // 		.subscribe(result => {
  // 			resolve(result);
  // 		});
  // 	});
  // }

  userLogin(userData) {
    $.ajax({
      type: 'POST', //type "GET"
      url: `${this.api}/login`, //the url to make the call
      data: userData,
      async: false,
      dataType: 'json', //data type to be returned
      complete: (result)=>{return result}, //function to be called upon a successful response //automatically passes the xml data to the function
      error: this.ajaxError
    });

    // $.post("http://localhost:9000/api/v1/login", userData)
    //   .done(result => {
    //     res = {
    //       status: true,
    //       result: result
    //     }
    //   })
    //   .fail((err)=>{
    //   // console.log(err);
    //   res = {
    //     status: false,
    //     result: err
    //   };
    //   // return false;
    //   // alert("Error: " + err.responseJSON.message);
    // });

    // return res;
  }

  ajaxSuccess(result) {
    return {
      status: true,
      result: result
    }
  }

  ajaxError(error) {
    return {
      status: false,
      result: error
    }
  }

  userSignup(userData) {
    // return new Promise((resolve, reject) => {
      $.post(`${this.api}/signup`, userData, (result)=>{
        let res = {
          status: true,
          result: result
        };
        return true; 
      }).fail((err)=>{
        // console.log(err);
        let res = {
          status: false,
          result: err
        };
        return false;
        // alert("Error: " + err.responseJSON.message);
      });
    // });
  }

  // userSignup(userData) {
  //   console.log("User Data in provider: ", userData);
  //   userData = JSON.stringify(userData);
  //   console.log("User Data after Stringify: ", userData);
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type" : "application/json"
  //     })
  //   }

  //   let headers = new HttpHeaders().set('contentType', 'application/json');
  //   return this.http.post(`${this.api}/signup`, userData, headers)
  //   .pipe(
  //     // catchError(this.errorHandler)
  //   );
  // }

  // userSignup(userData) {
  // 	return new Promise(resolve => {
  // 		let headers = new HttpHeaders();
  // 		headers.append("Content-Type", "application/json");
  // 		this.http.post(`${this.api}/signup`, JSON.stringify(userData), {headers : headers})
  // 		.subscribe(result => {
  // 			resolve(result);
  // 		}, err => {
  //       // console.log(err.error.message);
  //       return err;
  //     });
  // 	});
  // }

  // private errorHandler(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error.message}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.'
  //   );
  // };

}
