import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {UserLogged} from './userLogged';

@Component({
    selector: 'my-userLogin',
	providers: [],
    templateUrl: '../templates/userLogin.html',
    styleUrls: ['../styles/common.css'],
})

export class UserLoginComponent { 
    public showDetails = false;
    public isValidOrEmptyMail = true;
    
    constructor(private _router: Router, private _user: UserLogged,
        private _routeParams: RouteParams) {}
    
    onSubmit() {
        console.log('pb id --- ' + this._user.pbId);
        console.log('customer id --- ' + this._user.customerId);
        this.isValidOrEmptyMail = this.validateMail();
        if (this.isValidOrEmptyMail) {
            this._router.navigate( ['SheetDashboard']  );
        }
    }
    
    validateMail() {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let isValid = this._user.mail == null || this._user.mail.trim().length == 0 || filter.test(this._user.mail);
        console.log('mail valid  -- ' + isValid);
        return isValid;
    }
    
    toggleShowDetails() {
        this.showDetails = !this.showDetails;
    }
    
    getDetailsMessage() {
        let message;
        if (this.showDetails) {
            message = 'Hide details, I had enough';
        } else {
            message = 'Wanna read some details?';
        }
        return message;
    }
    
}