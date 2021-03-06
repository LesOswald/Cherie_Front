import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Marca } from '../models/marca';

@Component({
    selector: 'marca-list',
    templateUrl: '../views/marca-list.html',
    providers: [UserService]

})

export class MarcaListComponent implements OnInit{
    public titulo: string;
    public marcas: Marca[];
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService

    ){
        this.titulo = 'Marcas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;

    }

    ngOnInit(){
        console.log('marca-list.component.ts Cargado');

        // Conseguir Listado De Marcas

    }

}