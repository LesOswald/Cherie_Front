import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { stringify } from 'querystring';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
  
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;

    constructor(
        private _userService:UserService
    ){
        this.titulo = 'Actualizar Datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
    
    }

    ngOnInit(){
        console.log('user-edit.component.ts Cargado');

    }

    onSubmit(){

        console.log(this.user);
        console.log("USUARIO INGRESADO", this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                console.log("TCL: UserEditComponent -> onSubmit -> response", response)
                if(!response.user){
                    this.alertMessage = 'Error Al Actualizar El Usuario';

                } else{
                    this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.alertMessage = 'Usuario Actualizado Correctamente';

                }
            },

            error => {
              var errorMessage = error;
              console.log("ERROR ENCONTRADO", error)
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.alertMessage = body.message;
                console.log(error);
      
              }
            }
        );
    }

    filesToUpload: Array<File>;

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;

    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
         var token = this.token;
         
         return new Promise(function(resolve, reject){
             
         })
    }

}

