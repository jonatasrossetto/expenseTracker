import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teste = [{username:'',text:''}];

  constructor(
    private _router: Router,
    private _activatedRoute:ActivatedRoute
    ) { }

    ngOnInit() {
      let accessToken = sessionStorage.getItem("accessToken");
      let refreshToken = sessionStorage.getItem("refreshToken");
      console.log('accessToken: '+accessToken);
      console.log('refreshToken: '+refreshToken);
      
      const authToken = {token:'Bearer '+accessToken};
      fetch('http://localhost:3000/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            }
        })
        .then(response =>{
          return response.json();
        }).then(data=>{
          this.teste = data;
          // console.log(teste);
        })
    }

  
}

