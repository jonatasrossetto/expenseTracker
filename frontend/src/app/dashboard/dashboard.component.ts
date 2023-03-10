import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  moviment = {
    date: String(''),
    description: String(''),
    category: String(),
    type: String(),
    value: String('')
  };

  editMoviment = {
    movId: Number(0),
    date: String(''),
    description: String(''),
    category: String(),
    type: String(),
    value: String('')
  };

  teste = [{movId: 0, userId:'', date: '', description: '', category: '', type: '', value: ''}];
  inputValor : number = 0;
  accessToken = String(sessionStorage.getItem("accessToken"));

  constructor(
    private _router: Router,
    private _activatedRoute:ActivatedRoute
    ) {}

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
      fetch('http://localhost:8000/moviments/addMovimentacao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            },
            body:JSON.stringify(this.moviment)
        })
        .then(response =>{
          if (response.status==403) {
            console.log('response status is 403');
            sessionStorage.clear();
            this._router.navigate(['login']);
            // return [{movId: 0,
            //   date: '',
            //   description: '',
            //   category: '',
            //   type: '',
            //   value: ''}]
          }
          return response.json();
        }).then(data=>{
          console.log(data);
          this.teste = data; // update table view
        });
        this.moviment.date='';
        this.moviment.description='';
        this.moviment.category='';
        this.moviment.value='';
    }

    deleteBtn(Id : number){
      console.log('deleteBtn for rowId:'+Id+' was pressed');
      let confirma=confirm("Deseja apagar a movimentação?");
      const start = Date.now();
      if (confirma==true){
        const authToken = {token:'Bearer '+this.accessToken};
        //update database
        fetch('http://localhost:8000/moviments/deleteMovimentacao', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(authToken)
              },
              body:JSON.stringify({movId: Id})
          })
          .then(response =>{
            if (response.status==403) {
              console.log('response status is 403');
              sessionStorage.clear();
              this._router.navigate(['login']);
              // return [{movId: 0,
              //   date: '',
              //   description: '',
              //   category: '',
              //   type: '',
              //   value: ''}]
            }
            return response.json();
          }).then(data=>{
            //console.log(data.message);
            this.teste = data; // update table view
            const end = Date.now();
            console.log('delete completed in: '+(end-start)+'ms');
          })
      }
      
    }

    openEditModalBtn(Id : number){
      //fills modal fields for edition
      console.log('openEditModalBtn clicked on moviment:'+Id);
      const selectedMoviment = this.teste.filter(data => data.movId===Id);
      // console.log(selectedMoviment);
      this.editMoviment.movId=Id;
      this.editMoviment.date=selectedMoviment[0].date.slice(0,10);
      this.editMoviment.description=selectedMoviment[0].description;
      this.editMoviment.category=selectedMoviment[0].category;
      this.editMoviment.type=selectedMoviment[0].type;
      this.editMoviment.value=selectedMoviment[0].value;
    }

    closeEditModalBtn(){
      this.editMoviment.movId=0;
      this.editMoviment.date='';
      this.editMoviment.description='';
      this.editMoviment.category='';
      this.editMoviment.type='';
      this.editMoviment.value='';
    }

    saveEditModalBtn(Id:number){
      console.log('saveEditModalBtn clicked for Id:'+Id);
      console.log(this.editMoviment);
      const authToken = {token:'Bearer '+this.accessToken};
      fetch('http://localhost:8000/moviments/updateMovimentacao', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            },
            body:JSON.stringify(this.editMoviment)
        })
        .then(response =>{
          if (response.status==403) {
            console.log('response status is 403');
            sessionStorage.clear();
            this._router.navigate(['login']);
            // return [{movId: 0,
            //   date: '',
            //   description: '',
            //   category: '',
            //   type: '',
            //   value: ''}]
          }
          return response.json();
        }).then(data=>{
          console.log(data);
          this.teste = data; // update table view
        });

    }

    ngOnInit() {
      const accessToken = sessionStorage.getItem("accessToken");
      //let refreshToken = sessionStorage.getItem("refreshToken");
      console.log('accessToken: '+accessToken);
      // console.log('refreshToken: '+refreshToken);
      if (accessToken!==null){
        const authToken = {token:'Bearer '+this.accessToken};
        fetch('http://localhost:8000/moviments/posts', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.stringify(authToken)
            }
        })
        .then(response =>{
          if (response.status==403) {
            console.log('response status is 403');
            sessionStorage.clear();
            this._router.navigate(['login']);
            // return [{movId: 0,
            //   date: '',
            //   description: '',
            //   category: '',
            //   type: '',
            //   value: ''}]
          }
          return response.json();
        }).then(data=>{
          this.teste = data; // update table view
        })
      } else {
        this._router.navigate(['login']);
      }
      
    }

  
}

