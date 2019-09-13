import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage: string;
  identity: any;
  token: string;

  constructor(
    private _userService:UserService,
    private router: Router
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  public onSubmit(){
    console.log("EJECUTANDO DESDE EL SUBMIT DE LA VISTA DE LOGIN");
    console.log("PROPIEDADES DEL USUARIO:", this.user);

    // Obtener Datos De Usuario Identificado
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response);
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El Usuario No Se Ha Identificado");

        } else{
          // Crear Elemento En localstorage Para Tener Al Usuario En Sesión
          localStorage.setItem('identity', JSON.stringify(identity));

          // Obtener Token Para Cada Petición http
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;
      
              if(this.token.length <= 0){
                alert("El Token No Se Ha Generado");
      
              } else{
                // Crear Elemento En localstorage Para Tener El Token Disponible
                localStorage.setItem('token', JSON.stringify(token));
                this.user = new User('', '', '', '', '', 'ROLE_USER', '');
                this.router.navigate(['/dashboard/mis-datos']);
                console.log(token);
                console.log(identity);
      
              }
            },
      
            error => {
              var errorMessage = <any>error;
      
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(error);
      
              }
            } 
          );
        }
      },

      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);

        }
      } 
    );
  }

}
