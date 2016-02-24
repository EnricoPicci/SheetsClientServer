import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {UserLogged} from './userLogged';

@Component({
    selector: 'my-userLogin',
	providers: [],
    templateUrl: '../templates/userLogin.html',
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