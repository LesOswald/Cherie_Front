import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]

})

export class AppComponent implements OnInit{
  
  public title = 'Chérie';
  public user: User;
  public userRegister: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url: string;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');
    this.url = GLOBAL.url;

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);

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

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;

  }

  onSubmitRegister(){
    console.log(this.userRegister);

    this._userService.register(this.userRegister).subscribe(
      response => {
        let user = response.user;
        this.userRegister = user;

        if(!user._id){
          this.alertRegister = 'Error En EL Registro';
          
        } else{
          this.alertRegister = 'Registro Exitoso, Ingresa Con' + this.userRegister.email;
          this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');

        }
      },

      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);

        }
      }  
    );
  }
}
