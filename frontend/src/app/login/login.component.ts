import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private _router: Router) { }

  inputUserEmail: string = '';
  inputUserPassword: string = '';
  tokenData = {};
  clickme() {
    console.log('sign-in.js is running');
    console.log('email: '+this.inputUserEmail);
    console.log('password: '+this.inputUserPassword);
    
    const authenticationData={
      username: this.inputUserEmail,
      password: this.inputUserPassword
    }

    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.stringify(authenticationData)
    });

    const options = {
      method: 'POST',
      headers: myHeaders
    };
    fetch('http://localhost:4000/login', options)
      .then(data => {
        if (!data.ok) {
          console.log(data.status);
          return
        }
        return data.json();
      }).then(teste => {
        this.tokenData=teste;
        console.log('accessToken: '+teste.accessToken);
        console.log('refreshToken: '+teste.refreshToken);
        const authToken = {token:'Bearer '+teste.accessToken};
        console.log('authToken:'+authToken.token);
        // const myHeadersA = new Headers({
        //   'Content-Type': 'application/json',
        //   'Authorization': JSON.stringify(authToken)
        // });
        fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            }
        })
        .then(response =>{
          return response.json();
            // console.log(JSON.stringify(response.body));
            // console.log('router');
            // this._router.navigate(['dashboard']);
        }).then(data=>{
          console.log(data);
        })
      }).catch(e => {
        console.log(e);
      });
      
  }

}
