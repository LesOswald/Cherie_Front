import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public identity;
    public token;
    public url: string;

    constructor(private http: Http){
        this.url = GLOBAL.url;

    }

    signup(usertologin:any, gethash = null): Observable<any>{
        console.log("PROPIEDADES CAPTURADAS", [usertologin], [gethash])
        if(gethash != null){
            usertologin.gethash = gethash;
        }
        let json =JSON.stringify(usertologin);
        let params = json;

        let headers = new Headers({'content-type':'application/json'});

        return this.http.post(this.url+'login', params, {headers: headers})
                        .map(res => res.json());
    }

    register(usertoregister){
        console.log("PROPIEDADES CAPTURADAS", [usertoregister])

        let json =JSON.stringify(usertoregister);
        let params = json;

        let headers = new Headers({'content-type':'application/json'});

        return this.http.post(this.url+'register', params, {headers: headers})
                        .map(res => res.json());

    }

    updateUser(usertoupdate){
        let json =JSON.stringify(usertoupdate);
        let params = json;

        let headers = new Headers({'content-type':'application/json', 'Authorization': this.getToken()});
        console.log("USER ID", [params] ,[json])

        return this.http.put(this.url+'update-user/' + usertoupdate._id, params, {headers: headers})
                        .map(res => res.json());
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;

        } else{
            this.identity = null;

        }

        return this.identity;

    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;

        } else{
            this.token = null;

        }

        return this.token;

    }
}