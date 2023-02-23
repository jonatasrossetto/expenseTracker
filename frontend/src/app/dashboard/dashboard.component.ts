import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  movimentacao = {
    data: String(''),
    descricao: String(''),
    categoria: String(),
    tipo: String(),
    valor: String('')
  }
  teste = [{rowId: 0, userId:'', data: '', descricao: '', categoria: '', tipo: '', valor: ''}];
  inputValor : number = 0;
  accessToken = String(sessionStorage.getItem("accessToken"));

  constructor(
    private _router: Router,
    private _activatedRoute:ActivatedRoute
    ) {
      
     }

    clickme(){
      //let accessToken = sessionStorage.getItem("accessToken");
      // console.log('click me is running');
      // console.log('Data: '+this.movimentacao.data);
      // console.log('Descrição: '+this.movimentacao.descricao);
      // console.log('Categoria: '+this.movimentacao.categoria);
      // console.log('Tipo: '+this.movimentacao.tipo);
      // console.log('Valor: '+this.movimentacao.valor);
      const authToken = {token:'Bearer '+this.accessToken};
      //update database
      fetch('http://localhost:3000/addMovimentacao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            },
            body:JSON.stringify(this.movimentacao)
        })
        .then(response =>{
          return response.json();
        }).then(data=>{
          this.teste = data; // update table view
        });
        this.movimentacao.data='';
        this.movimentacao.descricao='';
        this.movimentacao.categoria='';
        this.movimentacao.valor='';
    }

    deleteBtn(rowId : number){
      console.log('deleteBtn for rowId:'+rowId+' was pressed');
      let confirma=confirm("Deseja apagar a movimentação?")
      if (confirma==true){
        const authToken = {token:'Bearer '+this.accessToken};
        //update database
        fetch('http://localhost:3000/deleteMovimentacao', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(authToken)
              },
              body:JSON.stringify({rowId: rowId})
          })
          .then(response =>{
            return response.json();
          }).then(data=>{
            //console.log(data.message);
            this.teste = data; // update table view
          })
      }
      

    }

    ngOnInit() {
      //let accessToken = sessionStorage.getItem("accessToken");
      let refreshToken = sessionStorage.getItem("refreshToken");
      // console.log('accessToken: '+accessToken);
      // console.log('refreshToken: '+refreshToken);
      
      const authToken = {token:'Bearer '+this.accessToken};
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
          this.teste = data; // update table view
        })
    }

  
}

