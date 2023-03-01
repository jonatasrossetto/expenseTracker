import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _router: Router) { }

  inputEmail: string = '';
  inputPassword: string = '';
  inputPasswordConfirmation: string = '';


  register(){
    console.log('register button clicked');
    console.log(this.inputEmail);
    console.log(this.inputPassword);
    console.log(this.inputPasswordConfirmation);
    // validateEmail(this.inputEmail);
    // validar dados antes de fazer a requisição
    // enviar dados para o servidor de auth
    // receber resposta do servidor de auth

  }

  ngOnInit(): void {
    console.log('signup is running');
  }

}

function validateEmail(input:string) {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(validRegex)) {
    alert("Valid email address!");
    // document.form1.text1.focus();
    return true;
  } else {
    alert("Invalid email address!");
    // document.form1.text1.focus();
    return false;
  }

}
