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
      user: this.inputUserEmail,
      password: this.inputUserPassword
    }
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(authenticationData)
    };
    fetch('http://localhost:3000/login', options)
      .then(data => {
        if (!data.ok) {
          console.log(data.status);
          return
        }
        return data.json();
      }).then(teste => {
        this.tokenData=teste;
        console.log(teste.token);
        const myHeaders = new Headers({
          'Content-Type': 'application/json',
          'x-access-token': teste.token
        });
        fetch('http://localhost:3000/clients', {
            method: 'GET',
            headers: myHeaders,
        }).then(response =>{
            console.log('router');
            this._router.navigate(['dashboard']);
        })
      }).catch(e => {
        console.log(e);
      });
      
  }

}
