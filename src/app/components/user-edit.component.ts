import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
    
})

export class UserEditComponent implements OnInit{
    filesToUpload: Array<File>;

    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public url: string;

    constructor(
        private _userService:UserService
    ){
        this.titulo = 'Actualizar Datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    
    }

    ngOnInit(){

    }

    onSubmit(){
        console.log("USUARIO INGRESADO", this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                console.log("TCL: UserEditComponent -> onSubmit -> response", response);
                if(!response.user){
                    this.alertMessage = 'Error Al Actualizar El Usuario';

                } else{
                    this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name;
                    
                    if(!this.filesToUpload){
                        // Redirección
                        
                    } else{
                        this.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload)
                            .then(
                                (result: any) => {
                                    this.user.image = result.image;
                                    localStorage.setItem('identity', JSON.stringify(this.user));
                                    let image_path = this.url+'get-image-user/'+this.user.image;
                                    document.getElementById('image-logged').setAttribute('src', image_path);

                                }
                        );
                    }

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


    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log("TCL: UserEditComponent -> fileChangeEvent -> this.filesToUpload", this.filesToUpload);

    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
         var token = this.token;
         
         return new Promise(function(resolve, reject){
             var formData: FormData = new FormData();
             var xhr = new XMLHttpRequest();
             
             for(var i =0; i < files.length; i++){
                formData.append('image', files[i], files[i].name);
            }
                
            console.log("TCL: UserEditComponent -> makeFileRequest -> formData", formData)
                
             xhr.onreadystatechange = function(){
                 if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.response));
                 } else{
                    reject(xhr.response)
                }
             }

             xhr.open('POST', url, true);
             xhr.setRequestHeader('Authorization', token);
             xhr.send(formData);

         })
    }
}

