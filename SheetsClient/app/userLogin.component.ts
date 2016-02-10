import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {UserLogged} from './userLogged';

@Component({
    selector: 'my-userLogin',
	providers: [],
    /*template: `
         <h2 width="100%">User name</h2>
         <input type="text" [(ngModel)]="_user.name">
         <button #button type="button" (click)="onClick(button)">LOGIN</button>
         
    `*/
    template: `
         <div class="container" style="width: 30%;">
            <h1>Login Form</h1>
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="form-group" style="width: 100%;">
                <label for="PBId" style="width: 25%; float: left">ID PB</label>
                <input type="text" class="form-control"
                    [(ngModel)]="_user.pbId" ngControl="pbId" #pbId="ngForm" style="width: 50%;">
            </div>
            <div [hidden]="pbId.valid || pbId.pristine" class="alert alert-danger" style="width: 100%;">
                Id PB obbligatorio
            </div>
            <div class="form-group" style="width: 100%;">
                <label for="CustomerId" style="width: 25%; float: left">ID Cliente</label>
                <input type="text" class="form-control" required
                    [(ngModel)]="_user.customerId" ngControl="customerId" #customerId="ngForm" style="width: 50%;">
            </div>
            <div [hidden]="pbId.valid || pbId.pristine" class="alert alert-danger" style="width: 100%;">
                Id cliente obbligatorio
            </div>
            <button type="submit" class="btn btn-default" [disabled]="!loginForm.form.valid">Invia</button>
            </form>
        </div>
    `,
    styleUrls: ['../styles/common.css'],
})

export class UserLoginComponent { 
    constructor(private _router: Router, private _user: UserLogged) {}
    
    onSubmit() {
        console.log('pb id --- ' + this._user.pbId);
        console.log('customer id --- ' + this._user.customerId);
        this._router.navigate( ['SheetDashboard']  );
    }
}