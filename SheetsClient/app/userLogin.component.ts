import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {UserLogged} from './userLogged';

@Component({
    selector: 'my-userLogin',
	providers: [],
    template: `
         <h2 width="100%">User name</h2>
         <input type="text" [(ngModel)]="_user.name">
         <button #button type="button" (click)="onClick(button)">LOGIN</button>
         
    `
})

export class UserLoginComponent { 
    constructor(private _router: Router, private _user: UserLogged) {}
    
    onClick(inButton: any) {
        console.log('user name --- ' + this._user.name);
        this._router.navigate( ['SheetDashboard']  );
    }
}